#include "../src/ReadCsvData.h"
#include "../src/Document.h"
#include <gtest/gtest.h>

TEST(ReadCsvData, ReadValidCsvFile) {
    ReadCsvData csvReader;
    // Use a valid CSV file for testing
    std::string filename = "../tests/test_data/test_valid.csv";
    ASSERT_TRUE(csvReader.read(filename));
}

TEST(DocumentTests, isAdded)
{
    Document testdoc;
    testdoc.add_field("age", 30);

    json data = {
        {"age", 30}
    };
    ASSERT_EQ(testdoc.getData(), data);
}



TEST(DocumentTests, isDeleted)
{
    Document testdoc;
    testdoc.add_field("age", 30);
    testdoc.add_field("Name", "John");
    testdoc.delete_field("age");
    json data = {
        {"Name", "John"},
    };

    ASSERT_EQ(testdoc.getData(), data); 
}

TEST(DocumentTests, isConstructed)
{
    std::vector<std::string> keys{"Name", "Age", "Location"};
    std::vector<json> vals{"John", 30, "New York"};

    Document testdoc(keys, vals);
    json data = {
        {"Name", "John"},
        {"Age", 30},
        {"Location", "New York"}
    };
    

    ASSERT_EQ(testdoc.getData(), data);
}



int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
