#pragma once
#include <unordered_map>
#include "Collections.h"

class Database {
public:
    using UUID = std::string;
    using Document = Document;
    using Collection = Collections<UUID, Document>;

    // Create an empty database.
    Database() = default;

    // Destructor.
    ~Database() = default;

    // Create a new collection.
    void createCollection(const std::string& name) {
        if (collections_.count(name) > 0) {
            throw std::runtime_error("Collection already exists.");
        }
        collections_.insert({name, Collection()});
    }

    // Remove an existing collection.
    void deleteCollection(const std::string& name) {
        collections_.erase(name);
    }

    // Fetch a collection by name.
    Collection& getCollection(const std::string& name) {
        auto it = collections_.find(name);
        if (it == collections_.end()) {
            throw std::runtime_error("Collection not found.");
        }
        return it->second;
    }

    // Check if a collection exists.
    bool hasCollection(const std::string& name) const {
        return collections_.count(name) > 0;
    }

    // Rename a collection.
    void renameCollection(const std::string& oldName, const std::string& newName) {
        auto it = collections_.find(oldName);
        if (it == collections_.end()) {
            throw std::runtime_error("Collection not found.");
        }
        if (collections_.count(newName) > 0) {
            throw std::runtime_error("A collection with the new name already exists.");
        }
        collections_.insert({newName, std::move(it->second)});
        collections_.erase(it);
    }

private:
    std::unordered_map<std::string, Collection> collections_;
};
