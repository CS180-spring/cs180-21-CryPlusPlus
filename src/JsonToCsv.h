#ifndef JSONTOCSV
#define JSONTOCSV

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include "../lib/json.hpp"
#include "WriteData.h"


using json = nlohmann::ordered_json;

class JsonWrite : public writeData {

    private:
        json jsonData;

    public:
        JsonWrite(){}
        virtual ~JsonWrite(){}

        bool isNested(const json& jsonObject) {

            if (jsonObject.empty()) {return false;}

            for (auto const& item : jsonObject.items()) {
                if (item.value().is_object()) {
                    return true;
                }
            }
            return false;
        }

        // void getHeaders(const json& jsonObject, std::string prefix = "") {
        //     for (auto const& item : jsonObject.items()) {
        //         std::string key = prefix + item.key();
        //         if (item.value().is_object()) {
        //             getHeaders(item.value(), key + "_");
        //         } else if (item.value().is_array()) {
        //             if (!item.value().empty() && item.value().front().is_structured()) {
        //                 getHeaders(item.value().front(), key + "_");
        //             } else {
        //                 headers.push_back(key);
        //             }
        //         } else {
        //             headers.push_back(key);
        //         }
        //     }
        // }

        void writeToFile(const json& jsonObject, const std::string & destinationPath) {
            
            std::ofstream oFile(destinationPath);


            if (!oFile.is_open()) {std::cout << "ERROR OPENING: " << destinationPath; return;}
            if (jsonObject.empty()) {oFile << "JSON File Empty." << std::endl; return;}
            //if (isNested(jsonObject) == true) {oFile << "Cannot Parse Nested Json Files, Sorry!" << std::endl; return;}
        

            headers.clear();
            //getHeaders();
            for (auto const& element : jsonObject.items()) {
                headers.push_back(element.key());
            }
            
            for (int i=0; i<headers.size(); ++i){
                oFile << headers[i] << ",";
            }

            oFile << std::endl;

            // for (size_t i = 0; i < jsonObject.size(); ++i) {
            for (size_t i = jsonObject.size(); i <= jsonObject.size(); ++i) {
                for (auto it = jsonObject.begin(); it != jsonObject.end(); ++it) {
                    if (it.value().is_array() && i < it.value().size()) {
                        oFile << it.value()[i] << ",";
                    } else {
                        oFile << it.value() << ",";
                    }
                }
                oFile << std::endl;
            }

            oFile.close();
            std::cout << "Successfully wrote JSON to CSV" << std::endl;

        }

//////////////////////////////////////////////////////////////////////////////

        const json& getJsonData() const {
            return jsonData;
        }

        const std::vector<std::string>& getHeaders() const {
            return headers;
        }
};


#endif