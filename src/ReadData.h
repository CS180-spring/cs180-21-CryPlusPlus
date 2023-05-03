#pragma once
#include <iostream>
#include <bit>
#include <algorithm>
#include <fstream>
#include <string>
#include <sstream>
#include "../lib/json.hpp"
#include <vector>
// using namespace std;
using json = nlohmann::ordered_json;

class ReadData
{
protected:
    std::string filename;
    std::vector<std::string> headers;
    json jsonData;
public:
    virtual ~ReadData() {};
    virtual bool read(const std::string &filename, bool fill = false, std::string fillVal = "NA") = 0;
    
    const json& getJsonData() const {
        return jsonData;
    }

    const std::vector<std::string>& getHeaders() const {
        return headers;
    }
};