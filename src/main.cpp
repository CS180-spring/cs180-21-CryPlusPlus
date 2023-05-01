#include <iostream>

#include <string>
#include "../src/WriteData.h"
#include "../src/JsonToCsv.h"
#include "../lib/json.hpp"
#include <filesystem>

using namespace std;


int main()
{

    string workingDic = filesystem::current_path().string();

    string outputPath = workingDic + "\\tests\\test_data\\output.csv";


    JsonWrite testingWrite1;

    json jsonData;
    std::string inputPath = workingDic + "\\tests\\test_data\\sample.json";
    std::ifstream iFile(inputPath);
    iFile >> jsonData;


    testingWrite1.writeToFile(jsonData, outputPath);

    return 0;

}



