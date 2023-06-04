#include <gtest/gtest.h>
#include <sstream>
#include "../src/CsvToJson.h"

//simple CSV file to JSON
TEST(CsvToJsonTest, ConvertSimpleCsvToJson) {
    std::string csvData = "Name,Age,City\n"
                          "John,25,New York\n"
                          "Alice,30,San Francisco\n"
                          "Bob,35,Chicago\n";

    std::string expectedJson = "[\n"
                               "    {\n"
                               "        \"Name\": \"John\",\n"
                               "        \"Age\": \"25\",\n"
                               "        \"City\": \"New York\"\n"
                               "    },\n"
                               "    {\n"
                               "        \"Name\": \"Alice\",\n"
                               "        \"Age\": \"30\",\n"
                               "        \"City\": \"San Francisco\"\n"
                               "    },\n"
                               "    {\n"
                               "        \"Name\": \"Bob\",\n"
                               "        \"Age\": \"35\",\n"
                               "        \"City\": \"Chicago\"\n"
                               "    }\n"
                               "]";

    std::istringstream csvStream(csvData);
    std::ostringstream jsonStream;
    convertCsvToJson(csvStream, jsonStream);

    std::string actualJson = jsonStream.str();

    EXPECT_EQ(actualJson, expectedJson);
}

//empty CSV file
TEST(CsvToJsonTest, HandleEmptyCsvFile) {
    std::string csvData = "";

    std::string expectedJson = "[]";

    std::istringstream csvStream(csvData);
    std::ostringstream jsonStream;
    convertCsvToJson(csvStream, jsonStream);

    std::string actualJson = jsonStream.str();

    EXPECT_EQ(actualJson, expectedJson);
}

//CSV file with missing values
TEST(CsvToJsonTest, HandleCsvWithMissingValues) {
    std::string csvData = "Name,Age,City\n"
                          "John,25,\n"
                          ",30,San Francisco\n"
                          "Bob,,Chicago\n";

    std::string expectedJson = "[\n"
                               "    {\n"
                               "        \"Name\": \"John\",\n"
                               "        \"Age\": \"25\",\n"
                               "        \"City\": \"\"\n"
                               "    },\n"
                               "    {\n"
                               "        \"Name\": \"\",\n"
                               "        \"Age\": \"30\",\n"
                               "        \"City\": \"San Francisco\"\n"
                               "    },\n"
                               "    {\n"
                               "        \"Name\": \"Bob\",\n"
                               "        \"Age\": \"\",\n"
                               "        \"City\": \"Chicago\"\n"
                               "    }\n"
                               "]";

    std::istringstream csvStream(csvData);
    std::ostringstream jsonStream;
    convertCsvToJson(csvStream, jsonStream);

    std::string actualJson = jsonStream.str();

    EXPECT_EQ(actualJson, expectedJson);
}
