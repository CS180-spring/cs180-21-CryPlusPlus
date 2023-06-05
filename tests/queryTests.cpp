#include <gtest/gtest.h>
#include "../src/Collection.h"
#include "../src/Document.h"
#include "../src/Query.h"


class QueryTest : public ::testing::Test {
protected:

    void SetUp() override {
        // Create a few documents
        Document doc1({{"name", "John"}, {"age", 30}, {"location", "New York"}});
        Document doc2({{"name", "Jane"}, {"age", 25}, {"location", "San Francisco"}});
        Document doc3({{"name", "Bob"}, {"age", 27}, {"location", "New York"}});

        // Insert the documents into the collection
        collections_.insert(doc1);
        collections_.insert(doc2);
        collections_.insert(doc3);
    }

    Collection collections_;
};

TEST_F(QueryTest, SingleCondition) {
    Query query(collections_);
    query.where({"age", GREATER_THAN, 25});

    auto results = query.getDocuments();
    ASSERT_EQ(results.size(), 2);
}

TEST_F(QueryTest, ChainedConditions) {
    Query query(collections_);
    auto results = query.where({"age", GREATER_THAN, 27}).where({"location", EQUAL, "New York"}).getDocuments();
;
    ASSERT_EQ(results.size(), 1);
    EXPECT_EQ(results[0].get_field_value("name"), "John");
}


TEST_F(QueryTest, ClearConditions) {
    Query query(collections_);
    auto results = query.where({"name", EQUAL, "Jane"}).getDocuments();


    ASSERT_EQ(results.size(), 1);

    query.clearDocuments();

    results = query.getDocuments();
    ASSERT_EQ(results.size(), 0);
}
