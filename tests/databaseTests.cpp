#include <gtest/gtest.h>
#include "../src/Database.h" // Assuming that your Database class is in the src directory.

using namespace testing;
class DatabaseTest : public Test {
protected:
    Database db;

    void SetUp() override {
        db.createCollection("users");
    }
};

TEST_F(DatabaseTest, CollectionCreatedSuccessfully) {
    EXPECT_TRUE(db.hasCollection("users"));
}

TEST_F(DatabaseTest, RenameCollection) {
    db.renameCollection("users", "customers");
    EXPECT_FALSE(db.hasCollection("users"));
    EXPECT_TRUE(db.hasCollection("customers"));
}

TEST_F(DatabaseTest, GetCollection) {
    Database::Collection& collection = db.getCollection("users");
    EXPECT_EQ(collection.size(), 0);
}

TEST_F(DatabaseTest, DeleteCollection) {
    db.deleteCollection("users");
    EXPECT_FALSE(db.hasCollection("users"));
}
