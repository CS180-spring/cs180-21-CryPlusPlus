#include <iostream>
#include "Collection.h"
#include "document.cpp"

int main() {
    Collection collection;

    // Create a few documents
    json data1 = { {"name", "Alice"}, {"age", 25}, {"email", "alice@example.com"} };
    Document doc(data1, "file1.json");
    doc.add_field("location/state", "California");
    doc.add_field("location/zip", 92507);
    doc.add_field("company/department/HR", true);
    std::cout << doc << std::endl;

    // json data2 = { {"name", "Bob"}, {"age", 30}, {"email", "bob@example.com"} };
    // Document doc2(data2, "file2.json");

    // json data3 = { {"name", "Charlie"}, {"age", 20}, {"email", "charlie@example.com"} };
    // Document doc3(data3, "file3.json");

    // // Add the documents to the collection
    // collection.insert(doc1);
    // collection.insert(doc2);
    // collection.insert(doc3);

    // // Sort the collection based on age
    // std::vector<Document> sorted_documents = collection.sort("age");

    // // Print out the sorted documents
    // for (const Document& doc : sorted_documents) {
    //     std::cout << doc.getData() << std::endl;
    // }

    return 0;
}
