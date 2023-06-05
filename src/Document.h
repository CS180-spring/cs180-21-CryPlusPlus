#pragma once
#include <unordered_map>
#include "../lib/json.hpp"
#include "../src/ReadData.h"
#include <iostream>
#include <string>
#include <vector>

using json = nlohmann::json;

inline std::vector<std::string> split_keys(const std::string& s, char delimiter) {
    std::vector<std::string> tokens;
    std::string token;
    std::istringstream tokenStream(s);
    while (std::getline(tokenStream, token, delimiter)) {
        tokens.push_back(token);
    }
    return tokens;
}




class Document
{
    private:
    json Data;
    int Size;
    std::vector<std::string> outside_Fields;

    public:
    std::string key;
    std::string file;
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

    Document(json data, std::string filename)
    {
        file = filename;
        Data = data;
    }



    void add_field(const std::string& key, const json& value)
    {
        std::istringstream key_stream(key);
        std::string segment;
        std::vector<std::string> path;

        while(std::getline(key_stream, segment, '/')) {
            path.push_back(segment);
        }

        json* node = &Data;
        for (size_t i = 0; i < path.size(); i++) {
            if (i == path.size() - 1) {
                (*node)[path[i]] = value;
            } else {
                if ((*node).find(path[i]) == (*node).end()) {
                    (*node)[path[i]] = json::object();
                }
                node = &(*node)[path[i]];
            }
        }

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

        auto keys = split_keys(key, '/');
        json* nestedData = &Data;

        for (int i = 0; i < keys.size(); i++)
        {
            const auto& k = keys[i];

            if (i < keys.size() - 1 && (nestedData->find(k) == nestedData->end() || !nestedData->at(k).is_object()))
            {
                throw std::invalid_argument("Key not found in the document or is not an object.");
            }

            // If this is the last key
            if (i == keys.size() - 1)
            {
                // If the key doesn't exist, throw an error
                if (nestedData->find(k) == nestedData->end())
                {
                    throw std::invalid_argument("Key not found in the document.");
                }

                // Otherwise, update the value
                (*nestedData)[k] = new_value;
            }
            else
            {
                // If it's not the last key, move to the next nested json object
                nestedData = &(*nestedData)[k];
            }
        }
    }



    bool has_field(const std::string& key) const
    {
        std::vector<std::string> keys = split_keys(key, '/');
        json temp = Data;
        
        for (auto &k : keys) {
            if (temp.find(k) != temp.end()) {
                temp = temp[k];
            } else {
                return false;
            }
        }
        return true;
    }


    json get_field_value(const std::string& key) const
    {

        auto keys = split_keys(key, '/');
        json nestedData = Data;

        for (const auto& k : keys)
        {
            if (nestedData.find(k) != nestedData.end())
            {
                nestedData = nestedData[k];
            }
            else
            {
                throw std::invalid_argument("Key not found in the document.");
            }

            auto it = Data.find(key);
            if (it != Data.end()) {
                return it.value();
            } else {
                throw std::invalid_argument("Key not found in the document.");

            }
        }
        return {};
    }

    
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