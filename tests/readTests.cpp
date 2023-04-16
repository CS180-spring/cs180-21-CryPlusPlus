#include "ReadCsvData.h"
#include <gtest/gtest.h>

TEST(ReadCsvData, ReadValidCsvFile) {
    ReadCsvData csvReader;
    // Use a valid CSV file for testing
    std::string filename = "test_valid.csv";
    ASSERT_TRUE(csvReader.read(filename));
}

TEST(ReadCsvData, ReadInvalidCsvFile) {
    ReadCsvData csvReader;
    // Use an invalid CSV file for testing
    std::string filename = "test_invalid.csv";
    ASSERT_FALSE(csvReader.read(filename));
}

int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
