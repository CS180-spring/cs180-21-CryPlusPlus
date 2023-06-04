#include <gtest/gtest.h>
#include "../src/Sort.h"
#include "../src/Document.h"
#include "../src/Collection.h"
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


TEST_F(SortTest, AscendingByName) {
    string sort_type = "ASCENDING"; 
    string sort_field = "name"; 

    Sort test1(sort_field, sort_type); 
    test1.document_sort(testcollection); 

    EXPECT_EQ(testcollection.front(), "doc3");
    EXPECT_EQ(testcollection.back(), "doc1");
}

TEST_F(SortTest, DescendingByName) {
    string sort_type = "DESCENDING"; 
    string sort_field = "name"; 
    
    Sort test2(sort_field, sort_type); 
    test2.document_sort(testcollection); 

    EXPECT_EQ(testcollection.front(), "doc1");
    EXPECT_EQ(testcollection.back(), "doc3");
}

TEST_F(SortTest, AscendingByAge) {
    string sort_type = "ASCENDING"; 
    string sort_field = "age"; 
    
    Sort test3(sort_field, sort_type); 
    test3.document_sort(testcollection); 

    EXPECT_EQ(testcollection.front(), "doc2");
    EXPECT_EQ(testcollection.back(), "doc1");
}

TEST_F(SortTest, DescendingByAge) {
    string sort_type = "DESCENDING"; 
    string sort_field = "age"; 

    Sort test4(sort_field, sort_type); 
    test4.document_sort(testcollection);

    EXPECT_EQ(testcollection.front(), "doc1");
    EXPECT_EQ(testcollection.back(), "doc2");
}

TEST_F(SortTest, AscendingByLocation) {
    string sort_type = "ASCENDING"; 
    string sort_field = "location"; 

    Sort test5(sort_field, sort_type); 
    test5.document_sort(testcollection); 

    EXPECT_EQ(testcollection.front(), "doc1");
    EXPECT_EQ(testcollection.back(), "doc2");
}

TEST_F(SortTest, DescendingByLocation) {
    string sort_type = "DESCENDING"; 
    string sort_field = "location"; 

    Sort test6(sort_field, sort_type); 
    test6.document_sort(testcollection); 

    EXPECT_EQ(testcollection.front(), "doc3");
    EXPECT_EQ(testcollection.back(), "doc1");
}


