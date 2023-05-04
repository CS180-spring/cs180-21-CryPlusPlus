#include "../src/Document.h"

inline std::ostream& operator<<(std::ostream& os, const Document& doc) {
    os << doc.getData().dump(4) << std::endl;
    return os;
}