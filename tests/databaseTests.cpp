#include <gtest/gtest.h>
#include "Database.h"
#include "Collection.h"

TEST(DatabaseTest, SingletonInstance) {
    Database& db1 = Database::getInstance();
    Database& db2 = Database::getInstance();

    // They should point to the same object
    EXPECT_EQ(&db1, &db2);
}

TEST(DatabaseTest, CreateAndDeleteCollection) {
    Database& db = Database::getInstance();

    // No collections at the beginning
    EXPECT_FALSE(db.hasCollection("collection1"));

    // Create a collection
    db.createCollection("collection1");
    EXPECT_TRUE(db.hasCollection("collection1"));

    // Delete the collection
    db.deleteCollection("collection1");
    EXPECT_FALSE(db.hasCollection("collection1"));
}

TEST(DatabaseTest, GetAndRenameCollection) {
    Database& db = Database::getInstance();

    // Create a collection
    db.createCollection("collection1");

    // Get the collection
    Collection& collection = db.getCollection("collection1");
    EXPECT_EQ(collection.getName(), "collection1");

    // Rename the collection
    db.renameCollection("collection1", "collection2");
    EXPECT_FALSE(db.hasCollection("collection1"));
    EXPECT_TRUE(db.hasCollection("collection2"));

    db.deleteCollection("collection2");
}


