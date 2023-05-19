#pragma once
#include <iostream>
#include "../lib/btree/btree.h"
#include "../lib/btree/map.h"
#include "../lib/UUID.hpp"
#include "../lib/json.hpp"
#include "../src/ReadData.h"
#include "../src/Document.h"
#include <filesystem>

using json = nlohmann::ordered_json;

template <typename KeyType, typename ValueType>
class Collections {
public:
    using BTreeMap = btree::map<KeyType, ValueType>;

    Collections() {int size = 0;}

    Collections(ReadData *reader, std::string folder_path) {
        try {
            for (const auto &entry : std::filesystem::directory_iterator(folder_path)) {
                std::cout << entry.path() << std::endl;

                // Extract filename without extension as key
                std::string filename = entry.path().stem().string();
                
                ValueType doc = ValueType(reader, entry.path().string()); // Create a Document object from the JSON data
                insert(filename, doc);
            }
        } catch (std::filesystem::filesystem_error &e) {
            std::cerr << "Error: " << e.what() << std::endl;
        }
    }

    void insert(const KeyType& key, const ValueType& value) {
        btree_map_.insert(std::make_pair(key, value));
    }

    void erase(const KeyType& key) {
        btree_map_.erase(key);
    }

    bool change_key(const KeyType& old_key, const KeyType& new_key) {
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

        ValueType document = it->second;
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


    //gpt
    ValueType& operator[](const KeyType& key) {
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

    // Add more operations as needed

private:
    BTreeMap btree_map_;
    std::string collection_name;

};
