        void writeToFile(const json& jsonObject, const std::string & destinationPath) {

            std::ofstream oFile(destinationPath);

            if (!oFile.is_open()) {std::cout << "ERROR OPENING: " << destinationPath; return;}
            if (jsonObject.empty()) {oFile << "JSON File Empty." << std::endl; return;}
            if (isNested(jsonObject)) {oFile << "Cannot Parse Nested Json Files, Sorry!" << std::endl; return;}
            
            headers.clear();
            getHeaders(jsonObject);
            
            for (const auto& header : headers) {
                oFile << header << ",";
            }

            oFile.seekp(-1, std::ios_base::end);
            oFile << std::endl;

            toCsvHelper(jsonObject, oFile);

            oFile.close();
            std::cout << "Successfully converted JSON to CSV" << std::endl;
        }


    void getHeaders(const json& jsonObject, std::string prefix = "") {
        for (auto const& item : jsonObject.items()) {
            std::string key = prefix + item.key();
            if (item.value().is_object()) {
                getHeaders(item.value(), key + "_");
            } else if (item.value().is_array()) {
                if (!item.value().empty() && item.value().front().is_structured()) {
                    getHeaders(item.value().front(), key + "_");
                } else {
                    headers.push_back(key);
                }
            } else {
                headers.push_back(key);
            }
        }
    }


    void toCsvHelper(const json& jsonObject, std::ofstream& oFile) {
        if (jsonObject.is_array()) {
            for (const auto& element : jsonObject) {
                toCsvHelper(element, oFile);
            }
        } else if (jsonObject.is_object()) {
            for (const auto& header : headers) {
                auto it = jsonObject.find(header);
                if (it != jsonObject.end()) {
                    if (it.value().is_object() || it.value().is_array()) {
                        oFile << it.value().dump();
                    } else {
                        oFile << it.value().dump() << ",";
                    }
                } else {
                    oFile << ",";
                }
            }
            oFile.seekp(-1, std::ios_base::end);
            oFile << std::endl;
            for (const auto& item : jsonObject.items()) {
                if (item.value().is_object() || item.value().is_array()) {
                    toCsvHelper(item.value(), oFile);
                }
            }
        } else {
            std::cerr << "JSON data is not an object or an array" << std::endl;
        }
    }