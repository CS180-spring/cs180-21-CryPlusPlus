#pragma once

#include "WriteData.h"
#include <iostream>
#include <fstream>
#include <vector>
#include <string>

using namespace std;

class writeToCvs : public writeData {

    public:
        void writeToFile(const string& fileName, const vector<vector<string>>& data) {
            
            ofstream file(fileName);

//Check to see if file opened properly and data to be written is aligned properly

            if (!file.is_open()) {
                cout << "Error opening: " << fileName << endl;
                exit;
            }

            if (!validData(data)) {
                cout << "Error: data is misaligned" << endl;
                exit;    
            }

            for (auto row : data) {
                for (auto value : row) {
                    file << value << ",";
                }
                file << endl;
            }

            file.close();
        }

        bool validData(const vector<vector<string>>& data){
            size_t numCols = data.front().size();

            for (auto line : data){
                if (line.size() != numCols) {
                    return false;
                }
            }

            return true;
        }
};