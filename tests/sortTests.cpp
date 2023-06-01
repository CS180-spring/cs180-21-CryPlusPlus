#include <gtest/gtest.h>
#include "../src/Sort.h"
#include "../src/Document.h"
#include "../src/Collection.h"
// #include "../src/Document.h"

using json = nlohmann::ordered_json;


// NOT COMPLETE NEED TO REFORMAT


TEST(SortTest, sorting) {
    std::sort_field = "ascending"; 
    json test1 = 
        [
            {
                "Name": "Charlie",
                "Age": 25,
                "Location": "Los Angeles"
            },
            {
                "Name": "Echo",
                "Age": 20,
                "Location": "New York"
            }
        ]

json test2 = 
[
    {
        "Name": "Delta",
        "Age": 25,
        "Location": "Los Angeles"
    },
    {
        "Name": "Bob",
        "Age": 20,
        "Location": "New York"
    }
]

}


