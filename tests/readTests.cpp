#include <gtest/gtest.h>
#include <string>
#include "../lib/json.hpp"
#include "../src/ReadJsonData.h"
#include "../src/ReadCsvData.h"


using json = nlohmann::json;

// Sample CSV and JSON files for testing
const std::string sample_csv_filename = "../tests/test_data/test_valid.csv";
const std::string sample_json_filename = "../tests/test_data/test_valid.json";

class ReadJsonDataTest : public ::testing::Test {
protected:
    ReadJsonData readJsonData;
};

class ReadCsvDataTest : public ::testing::Test {
protected:
    ReadCsvData readCsvData;
};

// TEST_F(ReadJsonDataTest, ReadFile) {
//     ReadJsonData readJsonData;

//     // Test reading a JSON file
//     ASSERT_TRUE(readJsonData.read(sample_json_filename));

//     // Test headers
//     std::vector<std::string> expected_headers = {"Name", "Age", "Location"};
//     ASSERT_EQ(readJsonData.getHeaders(), expected_headers);

//     // Test JSON data
//     json expected_data = json::parse(R"([{"Name":"Alice","Age":30,"Location":"Los Angeles"},)"
//                                       R"({"Name":"Bob","Age":25,"Location":"New York"}])");
//     ASSERT_EQ(readJsonData.getJsonData(), expected_data);
// }

// TEST_F(ReadCsvDataTest, ReadFile) {
//     ReadCsvData readCsvData;

//     // Test reading a CSV file
//     ASSERT_TRUE(readCsvData.read(sample_csv_filename));

//     // Test headers
//     std::vector<std::string> expected_headers = {"Name", "Age", "Location"};
//     ASSERT_EQ(readCsvData.getHeaders(), expected_headers);

//     // Test JSON data
//     json expected_data = json::parse(R"([{"Name":"Alice","Age":"30","Location":"Los Angeles"},)"
//                                       R"({"Name":"Bob","Age":"25","Location":"New York"}])");
//     ASSERT_EQ(readCsvData.getJsonData(), expected_data);
// }