#pragma once
#include <functional>
#include <vector>
#include "../src/Collections.h"

enum ComparisonType {
    EQUAL,
    NOT_EQUAL,
    GREATER_THAN,
    LESS_THAN,
    GREATER_THAN_OR_EQUAL,
    LESS_THAN_OR_EQUAL
};

struct Condition {
    std::string field;
    ComparisonType comparison_type;
    json value;
};

template <typename KeyType, typename ValueType>
class Query {
public:
    using CollectionsType = Collections<KeyType, ValueType>;

    Query(CollectionsType &collections) : collections_(collections) {}


    Query &where(const Condition &condition) {
        conditions_.push_back(condition);
        return *this;
    }



    std::vector<KeyType> getKeys() {
        return filterKeys();
    }

    std::vector<ValueType> getDocuments() {
        return filterDocuments();
    }

    void clearConditions() {
        conditions_.clear();
    }

    void clearDocuments()
    {
        collections_.clear();
    }

    std::vector<Condition> getConditions()
    {
        return conditions_;
    }

private:
    CollectionsType &collections_;
    std::vector<Condition> conditions_;
    //chatgpt
    std::vector<KeyType> filterKeys() {
        std::vector<KeyType> result;
        for (const auto &kv : collections_.getMap()) {
            bool match = true;
            for (const auto &condition : conditions_) {
                match &= checkCondition(kv.second, condition);
                if (!match) {
                    break;
                }
            }

            if (match) {
                result.push_back(kv.first);
            }
        }
        return result;
    }

    std::vector<ValueType> filterDocuments() {
        std::vector<ValueType> result;
        for (const auto &kv : collections_.getMap()) {
            bool match = true;
            for (const auto &condition : conditions_) {
                match &= checkCondition(kv.second, condition);
                if (!match) {
                    break;
                }
            }

            if (match) {
                result.push_back(kv.second);
            }
        }
        return result;
    }
    //

bool checkCondition(const ValueType &doc, const Condition &condition) {
    // Split the key string by '.'
    std::istringstream key_stream(condition.field);
    std::string segment;
    std::vector<std::string> key_segments;
    while (std::getline(key_stream, segment, '.')) {
        key_segments.push_back(segment);
    }

    // Access the nested JSON value
    json current_value = doc.getData();
    for (const auto& key_segment : key_segments) {
        if (current_value.find(key_segment) == current_value.end()) {
            return false;
        }
        current_value = current_value[key_segment];
    }

    // Perform the comparison
    switch (condition.comparison_type) {
        case EQUAL:
            return current_value == condition.value;
        case NOT_EQUAL:
            return current_value != condition.value;
        case LESS_THAN:
            return current_value < condition.value;
        case LESS_THAN_OR_EQUAL:
            return current_value <= condition.value;
        case GREATER_THAN:
            return current_value > condition.value;
        case GREATER_THAN_OR_EQUAL:
            return current_value >= condition.value;
        default:
            return false;
    }
}

};
