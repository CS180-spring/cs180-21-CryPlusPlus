#include <boost/beast/core.hpp>
#include <boost/beast/http.hpp>
#include <boost/beast/version.hpp>
#include <boost/archive/iterators/binary_from_base64.hpp>
#include <boost/archive/iterators/transform_width.hpp>
#include <boost/asio.hpp>
#include <chrono>
#include <cstdlib>
#include <ctime>
#include <iostream>
#include <fstream>
#include <memory>
#include <string>
#include "ReadJsonData.h"
#include "Database.h"
#include "Document.cpp"
#include "Query.h"
#include "../lib/json.hpp"

namespace beast = boost::beast;         // from <boost/beast.hpp>
namespace http = beast::http;           // from <boost/beast/http.hpp>
namespace net = boost::asio;            // from <boost/asio.hpp>
using tcp = boost::asio::ip::tcp;       // from <boost/asio/ip/tcp.hpp>
using namespace std;

using json = nlohmann::json;

std::string deletedCollection = "";
std::string previousCollection = "";
std::string createdCollection = "";

class CurrentCollection {
public:
    static CurrentCollection& getInstance() {
        static CurrentCollection instance; // Guaranteed to be destroyed. Instantiated on first use.
        return instance;
    }

    // Delete copy constructor and assignment operator
    CurrentCollection(CurrentCollection const&) = delete;
    void operator=(CurrentCollection const&) = delete;

    void setCollection(std::string const& collection) {
        current_collection = collection;
    }

    std::string getCollection() const {
        return current_collection;
    }

private:
    CurrentCollection() {} // Private constructor

    std::string current_collection = "";
};




namespace my_program_state
{
    std::size_t
    request_count() {
        static std::size_t count = 0;
        return ++count;
    }

    std::time_t now() {
        return std::time(0);
    }
}

class http_connection : public std::enable_shared_from_this<http_connection>
{
public:
    string current_collection;

    http_connection(tcp::socket socket) : socket_(std::move(socket)) {
        // Access the Database singleton instance
        Database& db = Database::getInstance();
        response_.set(http::field::access_control_allow_origin, "http://localhost:3000");
        response_.set(http::field::access_control_allow_methods, "GET, POST, PUT, DELETE, OPTIONS");
        response_.set(http::field::access_control_allow_headers, "Content-Type");
        // Now you can perform operations on the db
    }
    

    // Initiate the asynchronous operations associated with the connection.
    void start() {
        read_request();
        check_deadline();
    }

private:
    // The socket for the currently connected client.
    tcp::socket socket_;

    // The buffer for performing reads.
    beast::flat_buffer buffer_{8192};

    // The request message.
    http::request<http::dynamic_body> request_;

    // The response message.
    http::response<http::dynamic_body> response_;

    // The timer for putting a deadline on connection processing.
    net::steady_timer deadline_{
        socket_.get_executor(), std::chrono::seconds(60)};

    // Asynchronously receive a complete request message.
    void read_request() {
        auto self = shared_from_this();

        http::async_read(socket_, buffer_, request_, [self](beast::error_code ec, std::size_t bytes_transferred) {
            boost::ignore_unused(bytes_transferred);
            if(!ec)
                self->process_request();
        });
    }

    void process_request() {
        response_.version(request_.version());
        response_.keep_alive(false);

        switch(request_.method()) {
            case http::verb::get:
                response_.result(http::status::ok);
                response_.set(http::field::server, "Beast");
                create_response();
                break;
            case http::verb::post:
                response_.result(http::status::ok);
                response_.set(http::field::server, "Beast");
                process_post_request();
                create_response();
                break;
            case http::verb::options:
                response_.result(http::status::ok);
                response_.set(http::field::access_control_allow_origin, "http://localhost:3000");
                response_.set(http::field::access_control_allow_methods, "GET, POST, PUT, DELETE, OPTIONS");
                response_.set(http::field::access_control_allow_headers, "Content-Type");
                break;
            default:
                response_.result(http::status::bad_request);
                response_.set(http::field::content_type, "text/plain");
                beast::ostream(response_.body())
                    << "Invalid request-method '"
                    << std::string(request_.method_string())
                    << "'";
                break;
            }

            write_response();
    }

    void process_post_request() {
        if(request_.target() == "/uploadFile") {
        Database& db = Database::getInstance();

        std::string post_content = beast::buffers_to_string(request_.body().data());

        // Parse the request body as JSON
        auto json = nlohmann::json::parse(post_content);

        // Extract the filename and data from the JSON object
        std::string filename = json["filename"];
        std::string base64Data = json["data"];

        // The base64 string has a prefix that we need to remove
        std::string prefix = "data:application/json;base64,";
        if (base64Data.substr(0, prefix.size()) == prefix) {
            base64Data = base64Data.substr(prefix.size());
        }

        // Decode the base64 string into binary data
        using namespace boost::archive::iterators;
        typedef transform_width<binary_from_base64<std::string::const_iterator>, 8, 6> base64_decode;
        std::string fileData(base64_decode(base64Data.begin()), base64_decode(base64Data.end()));

        // Parse the decoded data into a JSON object
        auto fileJson = nlohmann::json::parse(fileData);

        // Check if the parsed JSON is an array or a single object
        if (fileJson.is_array()) {
            // This is an array of documents
            for (auto x : fileJson) {
                Document newDoc(x, filename);
                db.getCollection(CurrentCollection::getInstance().getCollection()).insert(newDoc);
            }
        } else if (fileJson.is_object()) {
            // This is a single document
            Document newDoc(fileJson, filename);
            db.getCollection(CurrentCollection::getInstance().getCollection()).insert(newDoc);
        }

        db.getCollection(CurrentCollection::getInstance().getCollection()).iterate();
    }
        else if(request_.target() == "/createCollection") {
            // Retrieve the content of the POST request
            std::string post_content = beast::buffers_to_string(request_.body().data());

            // Parse the request body as JSON
            auto json = nlohmann::json::parse(post_content);


            Database& db = Database::getInstance();
            db.createCollection(json["name"].get<std::string>());

            // Print a confirmation message to the console
            createdCollection = json["name"].get<std::string>();
            std::cout << "Created collection: " << json["name"].get<std::string>() << std::endl;
        }
        else if(request_.target() == "/changeCollection") {
            previousCollection = CurrentCollection::getInstance().getCollection();
            std::string post_content = beast::buffers_to_string(request_.body().data());
            auto json = nlohmann::json::parse(post_content);
            CurrentCollection::getInstance().setCollection(json["selectedCollection"].get<std::string>());
            cout << "Changed collection from " << previousCollection << " to " << CurrentCollection::getInstance().getCollection() << endl;

        }
        else if(request_.target() == "/deleteCollection") {
            std::string post_content = beast::buffers_to_string(request_.body().data());
            auto json = nlohmann::json::parse(post_content);
            string deleted = json["name"].get<std::string>();
            Database& db = Database::getInstance();
            db.deleteCollection(deleted);
            cout << "Deleted Collection: " << deleted << endl;
            deletedCollection = deleted;
        }
        else if(request_.target() == "/query") {
            std::string post_content = beast::buffers_to_string(request_.body().data());
            auto json = nlohmann::json::parse(post_content);
            
            cout << "Querying " << CurrentCollection::getInstance().getCollection() << " where: " << json << endl;
        }
        else if(request_.target() == "/sortBy") {
            std::string post_content = beast::buffers_to_string(request_.body().data());
            auto json = nlohmann::json::parse(post_content);
            
            cout << "Sorting by " << json["field"] << " from '" << CurrentCollection::getInstance().getCollection() << "' in " << json["order"] << endl;
        }
    }  


    // Construct a response message based on the program state.
    void create_response() {
        if(request_.target() == "/uploadFile") {
            response_.set(http::field::content_type, "text/html");
            json resp = {
                {"message", "Uploaded file [FILE_NAME] with [DOCUMENT_NUMBER] documents to collection '" + CurrentCollection::getInstance().getCollection() + "'"},
                {"time", my_program_state::now()},
            };
            beast::ostream(response_.body())
                << std::string(resp.dump());
        }
        else if(request_.target() == "/createCollection") {
            response_.set(http::field::content_type, "text/html");
            json resp = {
                {"message", "Created collection '" + createdCollection + "'"}, 
                {"time", my_program_state::now()},
            };
            beast::ostream(response_.body())
                << std::string(resp.dump());
        }
        else if(request_.target() == "/changeCollection") {
            response_.set(http::field::content_type, "text/html");
            json resp = {
                {"message", "Changed collection from '" + previousCollection + "' to '" + CurrentCollection::getInstance().getCollection() + "'"}, 
                {"time", my_program_state::now()},
            };
            beast::ostream(response_.body())
                << std::string(resp.dump());
        }
        else if(request_.target() == "/deleteCollection") {
            response_.set(http::field::content_type, "text/html");
            json resp = {
                {"message", "Deleted collection '" + deletedCollection + "'"}, 
                {"time", my_program_state::now()},
            };
            beast::ostream(response_.body())
                << std::string(resp.dump());
        }
        else if(request_.target() == "/query") {
            response_.set(http::field::content_type, "text/plain");

            json tableData = {
                {
                    {"name", "Charlie"},
                    {"age", 30},
                    {"location", "New York"},
                }
                {
                    {"name", "Delta"},
                    {"age", 25},
                    {"location", "San Francisco"},
                }
                {
                    {"name", "Bob"},
                    {"age", 27},
                    {"location", "Riverside"},
                }
                {
                    {"name", "Alpha"},
                    {"age", 31},
                    {"location", "Seattle"},
                }
                {
                    {"name", "Beta"},
                    {"age", 35},
                    {"location", "Dallas"},
                }
            }

            // std::string currCollection = CurrentCollection::getInstance().getCollection();
            // auto collectionReference = Database::getInstance().getCollection(currCollection);
            
            // Query<std::string, Document> query(collectionReference);
            // auto results = query.getDocuments();

            // json jsonResults;
            // for (auto document : results)
            //     jsonResults.push_back(document.getData());

            json resp = {
                {"message", "Query on [Collection] where [field] [condition] [value]"}, 
                {"time", my_program_state::now()},
                {"data", tableData},
            };
            beast::ostream(response_.body())
                << std::string(resp.dump());
        }
        else if(request_.target() == "/sortBy") {
            response_.set(http::field::content_type, "text/html");

            json columns = {"title", "author", "date"};
            json table = {{
                {"name", "Delta"},
                {"age", 25},
                {"location", "San Francisco"},
            }};

            json data {
                {"columns", columns},
                {"data", table}
            };

            json resp = {
                {"message", "Sorted '" + CurrentCollection::getInstance().getCollection() + "'"}, 
                {"time", my_program_state::now()},
                {"data", data}
            };
            beast::ostream(response_.body())
                << std::string(resp.dump());
        }
        else if(request_.target() == "/time") {
            std::cout << "in time" << std::endl;
            response_.set(http::field::content_type, "text/html");
            json resp = {{"time", my_program_state::now()}};
            beast::ostream(response_.body())
                << std::string(resp.dump());
        }
        else {
            response_.result(http::status::not_found);
            response_.set(http::field::content_type, "text/plain");
            beast::ostream(response_.body()) << "Test\r\n";
        }
    }

    // Asynchronously transmit the response message.
    void write_response() {
        auto self = shared_from_this();

        response_.content_length(response_.body().size());

        http::async_write(
            socket_,
            response_,
            [self](beast::error_code ec, std::size_t)
            {
                self->socket_.shutdown(tcp::socket::shutdown_send, ec);
                self->deadline_.cancel();
            });
    }

    // Check whether we have spent enough time on this connection.
    void check_deadline() {
        auto self = shared_from_this();

        deadline_.async_wait(
            [self](beast::error_code ec)
            {
                if(!ec)
                {
                    // Close socket to cancel any outstanding operation.
                    self->socket_.close(ec);
                }
            });
    }
};

// "Loop" forever accepting new connections.
void http_server(tcp::acceptor& acceptor, tcp::socket& socket) {
  acceptor.async_accept(socket,
      [&](beast::error_code ec)
      {
          if(!ec)
              std::make_shared<http_connection>(std::move(socket))->start();
          http_server(acceptor, socket);
      });
}

int main(int argc, char* argv[]) {
    std::cout << "Starting" << std::endl;
    try {
        // Check command line arguments.
        if(argc != 3) {
            std::cerr << "Usage: " << argv[0] << " <address> <port>\n";
            std::cerr << "  For IPv4, try:\n";
            std::cerr << "    receiver 0.0.0.0 80\n";
            std::cerr << "  For IPv6, try:\n";
            std::cerr << "    receiver 0::0 80\n";
            return EXIT_FAILURE;
        }

        auto const address = net::ip::make_address(argv[1]);
        unsigned short port = static_cast<unsigned short>(std::atoi(argv[2]));

        net::io_context ioc{1};

        tcp::acceptor acceptor{ioc, {address, port}};
        tcp::socket socket{ioc};
        http_server(acceptor, socket);

        ioc.run();
    }
    catch(std::exception const& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }
}
