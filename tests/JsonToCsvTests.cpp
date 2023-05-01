#include "../src/JsonToCsv.h"
#include "../src/WriteData.h"
#include "../src/WriteCsvData.h"
#include <gtest/gtest.h>
#include "../lib/json.hpp"

TEST(csvWriteTests, emptyJson)
{
    nlohmann::json emptyData;
    std::string expectedOutput = "JSON File Empty.\n";
    std::stringstream oStream;

    jsonWrite testingEmpty;
    testingEmpty.writeToFile(emptyData, oStream);
    std::string actualOutput = oStream.str();

    EXPECT_TRUE(expectedOutput == actualOutput);
}

TEST(csvWriteTests, simpleJson)
{
    nlohmann::json jsonData = {
        {"people", {
            {{"name", "Alice"}, {"age", 25}},
            {{"name", "Bob"}, {"age", 30}}
        }}
    };

    std::string expectedOutput = 
        "\"name\",\"age\"\n"
        "\"Alice\",25\n"
        "\"Bob\",30\n";

    std::stringstream oStream;
    JsonWrite testWrite;
    testWrite.writeToFile(jsonData, oStream);
    std::string trueOutput = oStream.str();

    EXPECT_EQ(expectedOutput, trueOutput);
}

TEST(csvWriteTests, stackedJson)
{
    nlohmann::json nestedJson =
    {
        "person": {
            "name": "Alice",
            "age": 25,
            "address": {
                "street": "123 Main St",
                "city": "Anytown",
                "state": "CA",
                "zip": 12345
            }
        }
    }

    std::string expectedOutput = "Cannot Parse Nested Json Files, Sorry!\n";
    std::stringstream oStream;
    JsonWrite nestedJsonTest;

    nestedJsonTest.writeToFile(nestedJson, oStream);
    std::string trueOutput = oStream.str();
    EXPECT_EQ(expectedOutput, trueOutput);

}