#include <iostream>
#include "readCsvData.h"

using namespace std;


int main()
{
    ReadCsvData test;
    test.read("test_valid.csv");
    return 0;
}