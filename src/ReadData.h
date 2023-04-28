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
    std::vector<std::string> headers;
public:
    virtual ~ReadData() {};
    virtual bool read(const std::string &filename, bool fill = false, std::string fillVal = "NA") = 0;
};