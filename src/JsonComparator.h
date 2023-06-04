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
      
        bool operator()(const Document& one, const Document& two) const {
                json value1, value2;

                if (one.has_field(sort_field_)){
                    value1 = one.get_field_value(sort_field_);
                }
                else {
                    value1 = "";
                }

                if (two.has_field(sort_field_)){
                    value2 = two.get_field_value(sort_field_);
                }
                else {
                    value2 = "";
                }

                return value1 < value2;
            }

    private:
        std::string sort_field_; 

};


