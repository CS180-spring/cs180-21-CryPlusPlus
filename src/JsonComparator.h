#pragma once
#include <unordered_map>
#include "../lib/json.hpp"
#include "../src/ReadData.h"
#include "../src/Document.h"
#include "../src/Collection.h"

#include <iostream>
#include <string>
#include <vector>

using json = nlohmann::json; 

class JsonComparator{ 

    public:
        explicit JsonComparator(const std::string& sort_field) : sort_field_(sort_field) {}
      
        // bool operator()(const Document& one, const Document& two) const {
        //         json value1, value2;

        //         if (one.has_field(sort_field_)){
        //             value1 = one.get_field_value(sort_field_);
        //             if (two.has_field(sort_field_)){
        //                 value2 = two.get_field_value(sort_field_);
        //                 return value1 < value2; // both  value1 and value2 have the sort field specified 
        //             }
        //             else { //only value1 has the sort field specified, value2 considered "greater" and added to back 
        //                 return true; 
        //             }
        //         } else if (two.has_field(sort_field_)){ //only value2 has the sort field specified, value1 still considered "greater" and added to back
        //             return true;
        //         }
        //         else {
        //             return false; //neither value have the sort field, keep the original order
        //         }
        // }


        bool operator()(const Document& one, const Document& two) const {
                json value1, value2;

                if (one.has_field(sort_field_)){
                    value1 = one.get_field_value(sort_field_);
                }
                else {
                    value1 = "";
                    return false;
                }

                if (two.has_field(sort_field_)){
                    value2 = two.get_field_value(sort_field_);
                }
                else {
                    value2 = "";
                    return false;
                }

                return value1 < value2;
        }

    private:
        std::string sort_field_; 

};



