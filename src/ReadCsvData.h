#pragma once
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "../lib/json.hpp"
#include "ReadData.h"

// using namespace std;
using json = nlohmann::ordered_json;

class ReadCsvData : public ReadData
{
private:
    json jsonData;
        //helper function to get fields
    std::vector<std::string> split(const std::string& s, char delimiter) {
        std::vector<std::string> fields;
        std::istringstream ss(s);
        std::string field;

        while (std::getline(ss, field, delimiter)) {
            fields.push_back(field);
        }
        return fields;
    }

    void processCsvFile(bool fill, const std::string &fillVal) {
        std::ifstream inputFile(filename);
        if (!inputFile.is_open()) {
            std::cerr << "Error opening file: " << filename << std::endl;
            return;
        }

        std::string line;
        std::vector<std::string> fields;
        bool headerProcessed = false;

        while (std::getline(inputFile, line)) {
            fields = split(line, ',');

            if (!headerProcessed) {
                headers = fields;
                headerProcessed = true;
            } else {
                json row;
                for (size_t i = 0; i < fields.size(); ++i) {
                    if (fill && fields[i].empty()) {
                        row[headers[i]] = fillVal;
                    } else {
                        row[headers[i]] = fields[i];
                    }
                }
                jsonData.push_back(row);
            }
        }
        inputFile.close();
    }

public:
    ReadCsvData() {}
    virtual ~ReadCsvData() {}

    virtual bool read(const std::string &filename, bool fill = false, std::string fillVal = "NA") override {
        this->filename = filename;
        processCsvFile(fill, fillVal);
        return !jsonData.empty();
    }

    const json& getJsonData() const {
        return jsonData;
    }

    const std::vector<std::string>& getHeaders() const {
        return headers;
    }
};
