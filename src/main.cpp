#include "Database.h"
#include "Collections.h"
#include "Document.cpp"
#include <iostream>
using namespace std;


int main()
{
    Database db;
    db.createCollection("users");
    Document doc;
    doc.add_field("username", "Alice");
    db.getCollection("users").insert(UUID::generate_uuid(), doc);
    db.getCollection("users").iterate();

}