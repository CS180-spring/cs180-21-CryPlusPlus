#include <gtest/gtest.h>
#include "../src/Sort.h"
#include "../src/Document.h"
#include "../src/Collections.h"
// #include "../src/Document.h"
#include <vector>
#include <string>

using json = nlohmann::ordered_json;

using namespace std;

using namespace testing; 

class SortTest : public Test {
    protected: 
        vector <Document> testcollection; 

        void SetUp() override {
            Document doc1({{"name", "John"}, {"age", 30}, {"location", "New York"}});
            Document doc2({{"name", "Chloe"}, {"age", 25}, {"location", "San Francisco"}});
            Document doc3({{"name", "Bob"}, {"age", 27}, {"location", "Seattle"}});

            testcollection.push_back(doc1);
            testcollection.push_back(doc2);
            testcollection.push_back(doc3); 
        }
};


TEST(SortTest, AscendingByName) {
    string sort_field = "ASCENDING"; 
    string sort_type = "name"; 
    document_sort(testcollection, sort_field, sort_type); 

    EXPECT_EQ(testcollection.front(), "doc3");
    EXPECT_EQ(testcollection.back(), "doc1");
}

TEST(SortTest, DescendingByName) {
    string sort_field = "DESCENDING"; 
    string sort_type = "name"; 
    document_sort(testcollection, sort_field, sort_type); 

    EXPECT_EQ(testcollection.front(), "doc1");
    EXPECT_EQ(testcollection.back(), "doc3");
}

TEST(SortTest, AscendingByAge) {
    string sort_field = "ASCENDING"; 
    string sort_type = "age"; 
    document_sort(testcollection, sort_field, sort_type); 

    EXPECT_EQ(testcollection.front(), "doc2");
    EXPECT_EQ(testcollection.back(), "doc1");
}

TEST(SortTest, DescendingByAge) {
    string sort_field = "DESCENDING"; 
    string sort_type = "age"; 
    document_sort(testcollection, sort_field, sort_type); 

    EXPECT_EQ(testcollection.front(), "doc1");
    EXPECT_EQ(testcollection.back(), "doc2");
}

TEST(SortTest, AscendingByLocation) {
    string sort_field = "ASCENDING"; 
    string sort_type = "location"; 
    document_sort(testcollection, sort_field, sort_type); 

    EXPECT_EQ(testcollection.front(), "doc1");
    EXPECT_EQ(testcollection.back(), "doc2");
}

TEST(SortTest, DescendingByLocation) {
    string sort_field = "DESCENDING"; 
    string sort_type = "location"; 
    document_sort(testcollection, sort_field, sort_type); 

    EXPECT_EQ(testcollection.front(), "doc3");
    EXPECT_EQ(testcollection.back(), "doc1");
}


