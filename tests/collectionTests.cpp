#include <gtest/gtest.h>
#include "../src/Collection.h"
#include "../src/ReadData.h"
// #include "../src/Document.h"

using json = nlohmann::json;

TEST(CollectionsTest, Insertion) {
    Collection collection;

    std::string key = "test_key";
    json test_data = {{"field1", "value1"}, {"field2", "value2"}};
    Document test_doc(test_data);

    collection.insert(test_doc);

    ASSERT_EQ(collection.size(), 1);
}

