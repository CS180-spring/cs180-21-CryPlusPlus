#include <iostream>
#include "../lib/btree/btree.h"
#include "../lib/btree/map.h"
// #include "../lib/btree/set.h"
#include "../src/Document.h"



template <typename KeyType, typename ValueType>
class Collections {
public:
    using BTreeMap = btree::map<KeyType, ValueType>;

    Collections() {}

    void insert(const KeyType& key, const ValueType& value) {
        btree_map_.insert(std::make_pair(key, value));
    }

    void erase(const KeyType& key) {
        btree_map_.erase(key);
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

    // Add more operations as needed

private:
    BTreeMap btree_map_;
};
