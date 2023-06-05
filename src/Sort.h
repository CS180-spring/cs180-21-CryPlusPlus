#pragma once
#include <unordered_map>
#include "../lib/json.hpp"
#include "../src/ReadData.h"
#include "../src/Document.h"
#include "../src/Collection.h"
#include "../src/JsonComparator.h"

#include <iostream>
#include <string>
#include <vector>

using json = nlohmann::json; 

class Sort{

public:
    Sort(const std::string& sort_field, std::string sort_type): sort_field_(sort_field), sort_type_(sort_type) {}
    
    void document_sort(std::vector<Document>& collection){
        
        if (sort_type_ == "ASCENDING"){ 
            std::sort(collection.begin(), collection.end(), JsonComparator(sort_field_)); 
        }
        else {
            std::sort(collection.rbegin(), collection.rend(), JsonComparator(sort_field_)); 
        }
    }

    private:
        std::string sort_field_;
        std::string sort_type_;

};



// sorting by a specific field that the front end is sending to the sort class
// within each collection, you can iterate through the document
// use "has a" or "has field" to search for the field's existence in the document 
// the key is the field (a string)
// to access the collection, you don't need the collection name, just a reference to the collection 
// sort within the b_tree 
// each file has multiple documents 
// sortBy(collection, "name", DESCENDING_ORDER) = sortBy(Collection &collection, string field, SORT_BY sortby)


//template <typename KeyType, typename ValueType>  // questionable 

// pretend that the collection is of type vector<Document>

/**
class SortCollection {
public:
    //using CollectionsSort = Collections<KeyType, ValueType>  // questionable 

    vector<Document> SortCollection(vector<Document>& collection, string field, SORT_BY sortby);

    Sort(std::string collection_name, std::string sort_field, std::string sort_type){}
 

    Sort(std::string collection_name, std::string sort_field, std::string sort_type)
    {
        // copy over json files from all documents and then sort together 
        // need reference to collection, then access to json files within all docs
        
        if (sort_type == "ASCENDING")
        {
            std:sort(collection_name.getData())


        }
        else if (sort_type == "DESCENDING")
        {
            std::sort(collection_name.getData(), greater()) //add greater() as third parameter 
        }
        else 
        {

        }
    

    }
};
**/

