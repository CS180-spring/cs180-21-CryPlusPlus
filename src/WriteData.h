#ifndef WRITE_DATA
#define WRITE_DATA

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "../lib/json.hpp"

using json = nlohmann::ordered_json;

// using namespace std;

class writeData {
    protected:
        std::vector<std::string> headers;
        std::string fileName;
    public:
        virtual ~writeData() {};
        virtual void writeToFile(const json& obj, const std::string & fileName) = 0;
};


#endif