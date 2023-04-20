#include "ReadData.h"

class ReadCsvData : public ReadData {
public:
    bool read(const std::string &filename, bool fill = false, std::string fillVal = "NA") {
    std::ifstream inputFile(filename);

    if (!inputFile.is_open()) {
        std::cerr << "Failed to open file: " << filename << std::endl;
        return false;
    }

    std::string line;
    bool isHeader = true;
    while (std::getline(inputFile, line)) {
        std::vector<std::string> fields = split(line, ',');
        //fill in empty values
        if(fill){
            while (fields.size() < headers.size()) {
            fields.push_back(fillVal);
        }
    }
        // On the first line, we collect the headers
        if (isHeader) {
            headers.assign(fields.begin(), fields.end());
            isHeader = false;
        } else {
            // If fill is false and there are different numbers of fields than what is in the header,
            // the CSV is unbalanced and invalid
            if (!fill && fields.size() != headers.size()) {
                std::cerr << "Invalid CSV format"<< std::endl;
                inputFile.close();
                return false;
            }

            // Process the fields as needed
            for (const std::string &field : fields) {
                std::cout << field << " ";
            }
            std::cout << std::endl;
        }
    }

    inputFile.close();
    return true;
}
};
