#pragma once
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "../lib/json.hpp"
#include "ReadData.h"

// using namespace std;
using json = nlohmann::json;

class ReadJsonData : public ReadData
{
private:

    void processJsonFile() {
        headers.clear();
        if (!jsonData.empty() && jsonData.is_array()) {
            for (const auto& item : jsonData[0].items()) {
                
                headers.push_back(item.key());
            }
        }
    }

public:
    ReadJsonData() {}
    virtual ~ReadJsonData() {}

    virtual bool read(const std::string &filename, bool fill = false, std::string fillVal = "NA") override {
        this->filename = filename;
        std::ifstream inputFile(filename);
        if (!inputFile.is_open()) {
            std::cerr << "Error opening file: " << filename << std::endl;
            return false;
        }

        try {
            inputFile >> jsonData;

            processJsonFile();
            inputFile.close();
            return true;
        } catch (const std::exception &e) {
            std::cerr << "Error parsing JSON file: " << e.what() << std::endl;
            return false;
        }
    }
};
