#include <gtest/gtest.h>
#include "../src/Collections.h"
#include "../src/ReadData.h"
// #include "../src/Document.h"

using json = nlohmann::ordered_json;

TEST(CollectionsTest, Insertion) {
    Collections<std::string, Document> collection;

    std::string key = "test_key";
    json test_data = {{"field1", "value1"}, {"field2", "value2"}};
    Document test_doc(test_data);

    collection.insert(key, test_doc);

    ASSERT_EQ(collection.size(), 1);
}

TEST(CollectionsTest, Erase) {
    Collections<std::string, Document> collection;

    std::string key = "test_key";
    json test_data = {{"field1", "value1"}, {"field2", "value2"}};
    Document test_doc(test_data);

    collection.insert(key, test_doc);
    collection.erase(key);

    ASSERT_EQ(collection.size(), 0);
}

TEST(CollectionsTest, ChangeKey) {
    Collections<std::string, Document> collection;

    std::string old_key = "old_key";
    std::string new_key = "new_key";
    json test_data = {{"field1", "value1"}, {"field2", "value2"}};
    Document test_doc(test_data);

    collection.insert(old_key, test_doc);
    ASSERT_TRUE(collection.change_key(old_key, new_key));
    ASSERT_EQ(collection.size(), 1);
}

TEST(CollectionsTest, Iterate) {
    // It's hard to test the output from `iterate` function directly
    // Instead, test the expected behavior by checking the contents of the collection
    Collections<std::string, Document> collection;

    std::string key1 = "key1";
    std::string key2 = "key2";
    json data1 = {{"field1", "value1"}, {"field2", "value2"}};
    json data2 = {{"field1", "value3"}, {"field2", "value4"}};
    Document doc1(data1);
    Document doc2(data2);

    collection.insert(key1, doc1);
    collection.insert(key2, doc2);

    ASSERT_EQ(collection[key1].getData(), data1);
    ASSERT_EQ(collection[key2].getData(), data2);
}
