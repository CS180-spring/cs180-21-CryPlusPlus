#pragma once
#include <iostream>
#include "../lib/btree/btree.h"
#include "../lib/btree/map.h"
#include "../lib/json.hpp"
#include "ReadData.h"
#include "Document.h"
#include <filesystem>
#include "../lib/UUID.hpp"

using json = nlohmann::json;

struct Comparator {
    std::string field;
    bool ascending;

    Comparator(const std::string& field, bool ascending) : field(field), ascending(ascending) {}

    bool operator()(const Document& a, const Document& b) const {
        if (!a.has_field(field) || !b.has_field(field))
            throw std::invalid_argument("Documents don't contain the specified field for sorting.");

        if (ascending)
            return a.get_field_value(field) < b.get_field_value(field);
        else
            return b.get_field_value(field) < a.get_field_value(field);
    }
};

class Collection {
public:
    using BTreeMap = btree::map<std::string, Document>;

    Collection() {int size = 0;}

    Collection(ReadData *reader, std::string folder_path) {
        try {
            for (const auto &entry : std::filesystem::directory_iterator(folder_path)) {
                std::cout << entry.path() << std::endl;

                // Extract filename without extension as key
                std::string filename = entry.path().stem().string();
                
                Document doc = Document(reader, entry.path().string()); // Create a Document object from the JSON data
                insert(doc);
            }
        } catch (std::filesystem::filesystem_error &e) {
            std::cerr << "Error: " << e.what() << std::endl;
        }
    }

    void insert(Document& value) {
        std::string key = UUID::generate_uuid();
        value.add_field("__UUID__", key);
        btree_map_.insert(std::make_pair(key, value));
        value.key = key;
    }

    void erase(const std::string& key) {
        btree_map_.erase(key);
    }

    bool change_key(const std::string& old_key, const std::string& new_key) {
        auto it = btree_map_.find(old_key);
        if (it == btree_map_.end()) {
            // Old key not found, do nothing
            return false;
        }

        // Check if the new key already existss
        if (btree_map_.find(new_key) != btree_map_.end()) {
            // New key already exists, do nothing
            return false;
        }

        Document document = it->second;
        btree_map_.erase(it);
        btree_map_.insert(std::make_pair(new_key, document));

        return true;
    }

    void iterate() {
        for (const auto& kv : btree_map_) {
            std::cout << "Key: " << kv.first << "\n";
            std::cout << "Value: " << kv.second << "\n";
        }
    }

    std::vector<Document> getVector(){
        std::vector<Document> docs;
        for (const auto& kv : btree_map_)
        {
            docs.push_back(kv.second);
        }
        return docs;
    }

    std::vector<Document> sort(const std::string& field, bool ascending = true) {
        std::vector<Document> docs = getVector();
        std::sort(docs.begin(), docs.end(), Comparator(field, ascending));
        return docs;
    }


    //gpt
    Document& operator[](const std::string& key) {
        return btree_map_.find(key)->second;
    }

    size_t size() const {
        return btree_map_.size();
    }
    //
    void clear() {
        btree_map_.clear();
    }

    BTreeMap getMap()
    {
        return btree_map_;
    }

    void setName(std::string name)
    {
        collection_name = name;
    }

    std::string getName() const
    {
        return collection_name;
    }



private:
    BTreeMap btree_map_;
    std::string collection_name;

};
