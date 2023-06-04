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

class Sort{

public:
    Sort(const std::string& sort_field, std::string sort_type): sort_field_(sort_field), sort_type_(sort_type) {}
    
    void document_sort(std::vector<Document>& collection){
        
        if (sort_type_ == "ASCENDING") { 
            std::sort(collection.begin(), collection.end(), JsonComparator(sort_field_)); 
        } else {
            std::sort(collection.rbegin(), collection.rend(), JsonComparator(sort_field_));
        }
    }

    private:
        std::string sort_field_;
        std::string sort_type_;

};
