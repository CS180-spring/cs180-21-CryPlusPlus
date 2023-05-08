#pragma once
#include <unordered_map>
#include "../lib/json.hpp"
#include "../src/ReadData.h"
#include <iostream>
#include <string>
#include <vector>

using json = nlohmann::ordered_json;


class Document
{
    private:
    json Data;
    int Size;
    std::vector<std::string> outside_Fields;

    public:
    //Default constructor
    Document() : Size(0) {}

    //constructor when being read in from file
    Document(ReadData *reader, std::string filename)
    {
        reader->read(filename);
        Data = reader->getJsonData();
    }

    Document(std::vector<std::string> keys, std::vector<json> vals)
    {
        outside_Fields = {};
        Size = 0;
        //gpt
        if (keys.size() != vals.size()) {
            throw std::invalid_argument("keys and vals vectors must have the same size.");
        }
        //

        for (int i = 0; i < keys.size(); i++) {
            add_field(keys[i], vals[i]);
        }
    }

    friend inline std::ostream& operator<<(std::ostream& os, const Document& doc);

    Document(json data)
    {
        Data = data;
    }

    //constructor takes in fields vector and json vector to fill in the document
    void add_field(const std::string& key, const json& value)
    {
        Data[key] = value;
        outside_Fields.push_back(key);
        Size++;
    }

    void delete_field(const std::string& key)
    {
        // Remove the field from the JSON data
        Data.erase(key);

        // Remove the field from the fields vector
        auto iter = std::find(outside_Fields.begin(), outside_Fields.end(), key);
        if (iter != outside_Fields.end()) {
            outside_Fields.erase(iter);
        }
        Size--;
    }

    void update_field(const std::string& key, const json& new_value)
    {
    if (Data.find(key) != Data.end()) {
        Data[key] = new_value;
    } else {
        throw std::invalid_argument("Key not found in the document.");
    }
    }

    bool has_field(const std::string& key) const
    {
        return Data.find(key) != Data.end();
    }

    json get_field_value(const std::string& key) const
    {
        auto it = Data.find(key);
        if (it != Data.end()) {
            return it.value();
        } else {
            throw std::invalid_argument("Key not found in the document.");
        }
    }
    //would it be possible to return a search like this
    //return item.contains("key") && item["key"] == "Whatever searched";    
    //would we store that into a string or array and in the end output that string/array?
    
    json getData() const
    {   
        return Data;
    }

    std::vector<std::string> getFields() const
    {
        return outside_Fields;
    }

    int getSize() const
    {
        return Size;
    }
    
    void clear()
    {
        Data.clear();
        outside_Fields.clear();
        Size = 0;
    }
};

