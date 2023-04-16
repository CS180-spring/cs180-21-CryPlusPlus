#pragma once
#include <iostream>
#include <bit>
#include <algorithm>
#include <fstream>
#include <string>
#include <sstream>
#include <vector>
// using namespace std;

class ReadData
{
protected:
    std::string filename;

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

public:
    virtual ~readData() {};
    virtual bool read(const std::string& filename) = 0;
};