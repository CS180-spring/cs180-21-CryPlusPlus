#include <iostream>
#include "ReadCsvData.h"

using namespace std;


int main()
{
    ReadCsvData test;
    test.read("../tests/test_data/test_invalid.csv", true, "0");
    return 0;
}