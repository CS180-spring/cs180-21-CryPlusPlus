#pragma once
#include <unordered_map>
#include "../lib/json.hpp"
#include <iostream>
#include <string>
#include <vector>

using json = nlohmann::json;

class Document
{
    private:
    json data;
    int size;
    std::vector<std::string> fields;

    public:
    //Default constructor
    Document() : size(0) {}
    //constructor when being read in from file
    Document(std::vector<std::string> keys, std::vector<json> vals)
    {
        fields = {};
        size = 0;
        //gpt
        if (keys.size() != vals.size()) {
            throw std::invalid_argument("keys and vals vectors must have the same size.");
        }
        //

        for (int i = 0; i < keys.size(); i++) {
            add_field(keys[i], vals[i]);
        }
    }

    //constructor takes in fields vector and json vector to fill in the document
    void add_field(const std::string& key, const json& value)
    {
        data[key] = value;
        fields.push_back(key);
        size++;
    }

    void delete_field(const std::string& key)
    {
        // Remove the field from the JSON data
        data.erase(key);

        // Remove the field from the fields vector
        auto iter = std::find(fields.begin(), fields.end(), key);
        if (iter != fields.end()) {
            fields.erase(iter);
        }
        size--;
    }

    void update_field(const std::string& key, const json& new_value)
    {
    if (data.find(key) != data.end()) {
        data[key] = new_value;
    } else {
        throw std::invalid_argument("Key not found in the document.");
    }
    }

    bool has_field(const std::string& key) const
    {
        return data.find(key) != data.end();
    }

    json get_field_value(const std::string& key) const
    {
        auto it = data.find(key);
        if (it != data.end()) {
            return it.value();
        } else {
            throw std::invalid_argument("Key not found in the document.");
        }
    }

    json getData() const
    {   
        return data;
    }

    std::vector<std::string> getFields() const
    {
        return fields;
    }

    int getSize() const
    {
        return size;
    }
    
    void clear()
    {
        data.clear();
        fields.clear();
        size = 0;
    }
};