#include "../src/ReadCsvData.h"
#include <gtest/gtest.h>

TEST(ReadCsvData, ReadValidCsvFile) {
    ReadCsvData csvReader;
    // Use a valid CSV file for testing
    std::string filename = "../tests/test_data/test_valid.csv";
    ASSERT_TRUE(csvReader.read(filename));
}


int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
