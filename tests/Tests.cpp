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

    json expected_data = {
        {"age", 30}
    };
    std::vector<std::string> expected_fields = {"age"};
    ASSERT_EQ(testdoc.getData(), expected_data);
    ASSERT_EQ(testdoc.getFields(), expected_fields);
    ASSERT_EQ(testdoc.getSize(), 1);
}

TEST(DocumentTests, isDeleted)
{
    Document testdoc;
    testdoc.add_field("age", 30);
    testdoc.add_field("Name", "John");
    testdoc.delete_field("age");
    json expected_data = {
        {"Name", "John"},
    };
    std::vector<std::string> expected_fields = {"Name"};
    ASSERT_EQ(testdoc.getData(), expected_data);
    ASSERT_EQ(testdoc.getFields(), expected_fields);
    ASSERT_EQ(testdoc.getSize(), 1);
}

TEST(DocumentTests, isConstructed)
{
    std::vector<std::string> keys{"Name", "Age", "Location"};
    std::vector<json> vals{"John", 30, "New York"};

    Document testdoc(keys, vals);
    json expected_data = {
        {"Name", "John"},
        {"Age", 30},
        {"Location", "New York"}
    };
    std::vector<std::string> expected_fields = {"Name", "Age", "Location"};

    ASSERT_EQ(testdoc.getData(), expected_data);
    ASSERT_EQ(testdoc.getFields(), expected_fields);
    ASSERT_EQ(testdoc.getSize(), 3);
}

TEST(DocumentTests, isConstructedWithEmptyVectors)
{
    std::vector<std::string> keys;
    std::vector<json> vals;

    Document testdoc(keys, vals);
    json expected_data = json::object();
    std::vector<std::string> expected_fields = {};

    ASSERT_EQ(testdoc.getData(), nullptr);
    ASSERT_EQ(testdoc.getFields(), expected_fields);
    ASSERT_EQ(testdoc.getSize(), 0);
}

TEST(DocumentTests, isConstructedWithMismatchedVectors)
{
    std::vector<std::string> keys{"Name", "Age"};
    std::vector<json> vals{"John", 30, "New York"};

    //GPT
    ASSERT_THROW(
    [] (const std::vector<std::string>& keys, const std::vector<json>& vals) {
        Document testdoc(keys, vals);
    }(keys, vals),
    std::invalid_argument
    );
    //
}


TEST(DocumentTests, isChanged)
{
    Document doc;
    doc.add_field("Name", "John");
    doc.add_field("Age", 30);

    doc.update_field("Age", 31);

    json expected_data = {
        {"Name", "John"},
        {"Age", 31}
    };

    ASSERT_EQ(doc.getData(), expected_data);
}

TEST(DocumentTests, isCleared)
{
    Document doc;
    doc.add_field("Name", "John");
    doc.add_field("Age", 30);

    doc.clear();

    json expected_data = json::object();
    ASSERT_EQ(doc.getData(), expected_data);
    ASSERT_EQ(doc.getSize(), 0);
}

TEST(DocumentTests, hasField)
{
    Document doc;
    doc.add_field("Name", "John");
    doc.add_field("Age", 30);

    ASSERT_TRUE(doc.has_field("Name"));
    ASSERT_TRUE(doc.has_field("Age"));
    ASSERT_FALSE(doc.has_field("Location"));
}

TEST(DocumentTests, returnValue)
{
    Document doc;
    doc.add_field("Name", "John");
    doc.add_field("Age", 30);

    json name_value = doc.get_field_value("Name");
    json age_value = doc.get_field_value("Age");

    ASSERT_EQ(name_value, "John");
    ASSERT_EQ(age_value, 30);

    // Check if it throws an exception when the key is not found
    ASSERT_THROW(doc.get_field_value("Location"), std::invalid_argument);
}



int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
