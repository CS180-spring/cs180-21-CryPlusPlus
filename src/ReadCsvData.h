#include "ReadData.h"

class ReadCsvData : public ReadData {
public:
    bool read(const std::string &filename) override {
        std::ifstream inputFile(filename);

        if (!inputFile.is_open()) {
            std::cerr << "Failed to open file: " << filename << std::endl;
            return false;
        }

        std::string line;
        while (std::getline(inputFile, line)) {
            std::vector<std::string> fields = split(line, ',');

            // Process the fields as needed
            for (const std::string& field : fields) {
                std::cout << field << " ";
            }
            std::cout << std::endl;
        }

        inputFile.close();
        return true;
    }
};
