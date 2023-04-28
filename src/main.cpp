#include <iostream>
#include "../src/ReadCsvData.h"
#include "../src/ReadJsonData.h"
using namespace std;


int main()
{
    ReadJsonData test;
    test.read("../src/test_nested.json");
    cout << test.getJsonData() << endl;
    return 0;
}