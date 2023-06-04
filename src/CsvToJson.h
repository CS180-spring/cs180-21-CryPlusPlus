#pragma once
#include <iostream>
#include <fstream>
#include <ostream>
#include <sstream>
#include <string>
#include <vector>
#include "../lib/json.hpp"
#include <unordered_map>

using json = nlohmann::ordered_json;

class CsvToJson {
    public:
        std::string convertCsvToJson(const std::string& csvFilePath) {
        std::ifstream file(csvFilePath);
        if (!file.is_open()) {
            std::cerr << "Failed to open CSV file." << std::endl;
            return "";
        }

        std::vector<std::string> columnNames;
        std::vector<std::unordered_map<std::string, std::string>> data;

        std::string line;
        std::getline(file, line);
        std::istringstream headerStream(line);
        std::string columnName;

        while (std::getline(headerStream, columnName, ',')) {
            columnNames.push_back(columnName);
        }

        while (std::getline(file, line)) {
            std::istringstream lineStream(line);
            std::string value;
            std::unordered_map<std::string, std::string> row;

            size_t columnIndex = 0;
            while (std::getline(lineStream, value, ',')) {
                // Check if the value is enclosed in quotes
                if (!value.empty() && value.front() == '"' && value.back() != '"') {
                    // Value contains a newline, continue reading until the closing quote is found
                    std::string continuationValue;
                    while (std::getline(lineStream, continuationValue, ',')) {
                        value += "," + continuationValue;
                        if (!continuationValue.empty() && continuationValue.back() == '"') {
                            break;
                        }
                    }
                }

                // Remove leading and trailing quotes if present
                if (!value.empty() && value.front() == '"' && value.back() == '"') {
                    value = value.substr(1, value.length() - 2);
                }

                row[columnNames[columnIndex]] = value;
                columnIndex++;
            }

            data.push_back(row);
        }

        file.close();

        json jsonData;
        for (const auto& row : data) {
            json jsonRow;
            for (const auto& column : columnNames) {
                jsonRow[column] = row.at(column);
            }
            jsonData.push_back(jsonRow);
        }

        return jsonData.dump();
    }

};