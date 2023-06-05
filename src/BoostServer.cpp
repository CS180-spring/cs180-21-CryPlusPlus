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
#include <unordered_set>
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

nlohmann::json_abi_v3_11_2::basic_json<> decodeFile(std::string base64Data)
{
    // The base64 string has a prefix that we need to remove
    std::string prefix = "data:application/json;base64,";
    if (base64Data.substr(0, prefix.size()) == prefix) {
        base64Data = base64Data.substr(prefix.size());
    }

    // Decode the base64 string into binary data
    using namespace boost::archive::iterators;
    typedef transform_width<binary_from_base64<std::string::const_iterator>, 8, 6> base64_decode;
    std::string fileData(base64_decode(base64Data.begin()), base64_decode(base64Data.end()));
    return nlohmann::json::parse(fileData);
}

ComparisonType stringToComparisonType(const std::string& condition) {
    if(condition == "Equal") return EQUAL;
    if(condition == "Not Equal") return NOT_EQUAL;
    if(condition == "Greater Than") return GREATER_THAN;
    if(condition == "Less Than") return LESS_THAN;
    if(condition == "Greater Than Or Equal") return GREATER_THAN_OR_EQUAL;
    if(condition == "Less Than Or Equal") return LESS_THAN_OR_EQUAL;

    throw std::invalid_argument("Invalid condition: " + condition);
}


void getFields(const json& jsonObj, unordered_set<string>& list, const std::string& parentKey = "") {
    for (auto& el : jsonObj.items()) {
        std::string key = parentKey == "" ? el.key() : parentKey + "/" + el.key();
        if (el.value().is_structured())
            getFields(el.value(), list, key);
        else {
            if (key != "__UUID__")
                list.insert(key);
        }
    }
}

json getFields(const json& jsonObj)
{
    unordered_set<string> fields;
    json jsonfields;
    for (auto x: jsonObj)
    {
        getFields(x, fields);
    }

    for (auto x: fields)
    {
        jsonfields.push_back(x);
    }

    return fields.empty() ? json::array() : jsonfields;
}

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
        document_count = 0;
        filename = "";
        // Now you can perform operations on the db
    }
    

    // Initiate the asynchronous operations associated with the connection.
    void start() {
        read_request();
        check_deadline();
    }

private:
    //upload file respone data
    std::string filename;
    int document_count;
    nlohmann::json_abi_v3_11_2::basic_json<> fileJson;
    nlohmann::json_abi_v3_11_2::basic_json<> queries;

    string sortby;
    string order;


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
            filename = json["filename"];
            std::string base64Data = json["data"];

            // Parse the decoded data into a JSON object
            fileJson = decodeFile(base64Data);

            bool collection_exists = true;
            // Check if the parsed JSON is an array or a single object
            if (fileJson.is_array()) {
                // This is an array of documents
                for (auto x : fileJson) {
                    document_count++;
                    Document newDoc(x, filename);
                    try {
                        db.getCollection(CurrentCollection::getInstance().getCollection()).insert(newDoc);
                    } catch (const std::runtime_error& e) {
                        std::cout << "Caught a runtime error: " << e.what() << std::endl;
                        collection_exists = false;
                    }
                }
            } else if (fileJson.is_object()) {
                // This is a single document
                document_count = 1;
                Document newDoc(fileJson, filename);
                try {
                    db.getCollection(CurrentCollection::getInstance().getCollection()).insert(newDoc);
                } catch (const std::runtime_error& e) {
                    std::cout << "Caught a runtime error: " << e.what() << std::endl;
                    collection_exists = false;
                }
            }
            if(collection_exists)
                db.getCollection(CurrentCollection::getInstance().getCollection()).iterate();
        }
        else if (request_.target() == "/action") 
        {

            std::string post_content = beast::buffers_to_string(request_.body().data());
            auto actions = nlohmann::json::parse(post_content);

            // Extract values from JSON
            std::string uuid = actions["uuid"].get<std::string>();
            std::string action = actions["action"].get<std::string>();
            std::string field = actions["field"].get<std::string>();
            nlohmann::json new_value = actions["newValue"];

            Database& db = Database::getInstance();

            std::string collectionName = CurrentCollection::getInstance().getCollection();
            
            try {
                Collection& collection = db.getCollection(collectionName);

                Document& document = collection[uuid];

                // Perform the action
                if (action == "edit") {
                    if (document.has_field(field)) {
                        document.update_field(field, new_value);
                    } else {
                        std::cout << "Field does not exist in the document." << std::endl;
                    }
                } else if (action == "add") {
                    if (!document.has_field(field)) {
                        document.add_field(field, new_value);
                    } else {
                        std::cout << "Field already exists in the document." << std::endl;
                    }
                } else if (action == "remove") {
                    if (document.has_field(field)) {
                        document.delete_field(field);
                    } else {
                        std::cout << "Field does not exist in the document." << std::endl;
                    }
                } else {
                    std::cout << "Unknown action: " << action << std::endl;
                }

                // collection.iterate();
            } catch (const std::runtime_error& e) {
                std::cout << "Caught a runtime error: " << e.what() << std::endl;
            }
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
        else if(request_.target() == "/deleteDocument") {
            std::string post_content = beast::buffers_to_string(request_.body().data());
            auto json = nlohmann::json::parse(post_content);
            string uuid = json["uuid"].get<std::string>();
            Database& db = Database::getInstance();
            db.getCollection(CurrentCollection::getInstance().getCollection()).erase(uuid);
            cout << "Deleted Document: " << uuid << endl;
        }
        else if(request_.target() == "/query") {
            std::string post_content = beast::buffers_to_string(request_.body().data());
            queries = nlohmann::json::parse(post_content);
            cout << queries << endl;
        }
        else if(request_.target() == "/sortBy") {
            std::string post_content = beast::buffers_to_string(request_.body().data());
            auto json = nlohmann::json::parse(post_content);

            sortby = json["field"];
            order = json["order"];
            
            cout << "Sorting by " << json["field"] << " from '" << CurrentCollection::getInstance().getCollection() << "' in " << json["order"] << endl;
        }
    }  


    // Construct a response message based on the program state.
    void create_response() {
        if(request_.target() == "/uploadFile") {
            response_.set(http::field::content_type, "application/json"); 
            Database& db = Database::getInstance();

            std::string collectionName = CurrentCollection::getInstance().getCollection();
            vector<Document> docs = db.getCollection(collectionName).getVector();

            json tableData = json::array();
            for (Document doc : docs)
                tableData.push_back(doc.getData());

            json data {
                {"columns", getFields(tableData)},
                {"data", tableData}
            };
            std::cout<< "Response " << fileJson << endl;

            nlohmann::json resp = {
                {"message", "Uploaded file " + filename + " with " + std::to_string(document_count) + " documents to collection '" + CurrentCollection::getInstance().getCollection() + "'"},
                {"time", my_program_state::now()},
                {"data", data}
            };
            beast::ostream(response_.body())
                << resp;
        }
        else if(request_.target() == "/createCollection") {
            response_.set(http::field::content_type, "text/html");
            json resp = {
                {"message", "Created collection '" + createdCollection + "'"}, 
                {"time", my_program_state::now()},
            };
            beast::ostream(response_.body())
                << resp;
        }
        else if(request_.target() == "/changeCollection") {
            response_.set(http::field::content_type, "text/html");
            Database& db = Database::getInstance();

            std::string collectionName = CurrentCollection::getInstance().getCollection();
            vector<Document> docs = db.getCollection(collectionName).getVector();

            json tableData = json::array();
            for (Document doc : docs)
                tableData.push_back(doc.getData());

            json data {
                {"columns", getFields(tableData)},
                {"data", tableData}
            };

            json resp = {
                {"message", "Changed collection from '" + previousCollection + "' to '" + CurrentCollection::getInstance().getCollection() + "'"}, 
                {"time", my_program_state::now()},
                {"data", data},
            };
            beast::ostream(response_.body())
                << resp;
        }
        else if(request_.target() == "/deleteCollection") {
            response_.set(http::field::content_type, "text/html");
            json resp = {
                {"message", "Deleted collection '" + deletedCollection + "'"}, 
                {"time", my_program_state::now()},
            };
            beast::ostream(response_.body())
                << resp;
        }
        else if(request_.target() == "/deleteDocument") {
            response_.set(http::field::content_type, "text/html");
            Database& db = Database::getInstance();

            std::string collectionName = CurrentCollection::getInstance().getCollection();
            vector<Document> docs = db.getCollection(collectionName).getVector();

            json tableData = json::array();
            for (Document doc : docs)
                tableData.push_back(doc.getData());

            json data {
                {"columns", getFields(tableData)},
                {"data", tableData}
            };

            json resp = {
                {"message", "Deleted collection '" + deletedCollection + "'"}, 
                {"time", my_program_state::now()},
                {"data", data},
            };
            beast::ostream(response_.body())
                << resp;
        }
        else if(request_.target() == "/query") {
            response_.set(http::field::content_type, "application/json");
            Database& db = Database::getInstance();
            std::string collectionName = CurrentCollection::getInstance().getCollection();
            Query query(db.getCollection(collectionName));

            // Check if the input is a single query or multiple queries
            if(queries.is_array()) {
                // Multiple queries
                for(auto& json : queries) {
                    // Ensure all parts of the query are present
                    if(json.contains("condition") && json.contains("field") && json.contains("value")) {
                        std::string condition = json["condition"];
                        std::string field = json["field"];
                        nlohmann::json value = nlohmann::json::parse(json["value"].get<std::string>());

                        // Convert the condition string to a ComparisonType
                        ComparisonType compType;
                        try {
                            compType = stringToComparisonType(condition);
                        } catch(const std::invalid_argument& e) {
                            std::cout << "Invalid condition: " << e.what() << std::endl;
                            continue;
                        }

                        // Chain the query conditions
                        query.where({field, compType, value});
                    }
                }
            } else if(queries.is_object()) {
                // Single query
                if(queries.contains("condition") && queries.contains("field") && queries.contains("value")) {
                    std::string condition = queries["condition"];
                    std::string field = queries["field"];
                    
                    nlohmann::json value = nlohmann::json::parse(queries["value"].get<std::string>());

                    ComparisonType compType;
                    try {
                        compType = stringToComparisonType(condition);
                    } catch(const std::invalid_argument& e) {
                        std::cout << "Invalid condition: " << e.what() << std::endl;
                        return;
                    }

                    // Apply the query condition
                    query.where({field, compType, value});
                }
            }

            std::vector<Document> results = query.getDocuments();

            json queriesJSON;    
            if(results.empty())
            {
                queriesJSON = json::array();
            }else
            {
            for (Document doc : results)
                queriesJSON.push_back(doc.getData());
            }


            cout << queriesJSON.dump(4) << endl;
            nlohmann::json resp = {
                {"message", "Query on " + collectionName + " with " + std::to_string(queries.size()) + " conditions"},
                {"time", my_program_state::now()},
                {"data", queriesJSON}
            };
            beast::ostream(response_.body())
                << resp;
        }
        else if(request_.target() == "/sortBy") {
            response_.set(http::field::content_type, "application/json");
            Database& db = Database::getInstance();
            std::string collectionName = CurrentCollection::getInstance().getCollection();
            Collection collection = db.getCollection(collectionName);
            
            bool orderB;
            if (order == "ascending order")
                orderB = true;
            else
                orderB = false;


            vector<Document> sorted = collection.sort(sortby, orderB);

            json tableData;
            for (auto doc: sorted)
            {
                cout << "Sorted: " << doc.getData() << endl;
                tableData.push_back(doc.getData());
            }


            json resp = {
                {"message", "Sorted '" + CurrentCollection::getInstance().getCollection() + "'"}, 
                {"time", my_program_state::now()},
                {"data", tableData}
            };
            beast::ostream(response_.body())
                << resp;
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
