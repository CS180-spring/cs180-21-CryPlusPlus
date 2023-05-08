#include <iostream>
#include "../src/ReadCsvData.h"
#include "../src/ReadJsonData.h"
#include "../src/Collections.h"
#include "../src/Document.h"
#include "../src/Document.cpp"
#include "../src/Query.h"
using namespace std;


int main() {
    Collections<string, Document> test(new ReadJsonData, "../src/docs");

    Query<std::string, Document> query(test);

    // Get documents with age > 25 and location equals New York
    

    auto result = query.where({"age", GREATER_THAN, 25 }).where({"address.city", EQUAL, "Los Angeles"}).getDocuments();

    for (const auto &doc : result) {
        std::cout << doc << std::endl;
    }

    return 0;
}


