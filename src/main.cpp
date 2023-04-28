#include <iostream>
#include "../src/ReadCsvData.h"
#include "../src/ReadJsonData.h"
#include "../src/Collections.h"
using namespace std;


int main() {
    Collections<std::string, Document> collections;

    // Insert documents
    Document doc1;
    doc1.add_field("Name", "John");
    doc1.add_field("Age", 32);
    collections.insert("doc1", doc1);

    Document doc2;
    doc2.add_field("Name", "Jane");
    collections.insert("doc2", doc2);

    // Access documents
    Document& doc = collections["doc1"];
    std::cout << "Name: " << doc.get_field_value("Name") << std::endl;

    // Delete documents
    // collections.erase("doc1");
    cout << int(collections["doc1"].get_field_value("Age")) * 10 << endl;

    return 0;
}
