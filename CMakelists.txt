cmake_minimum_required(VERSION 3.10)

# Set the name of the project and the target executable
project(ExcelReaderServer)
set(TARGET_NAME excel_reader_server)

# Set the C++ standard to C++17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)



# Create the executable target
add_executable(main
"src/main.cpp"
)

# Add the include directories
include_directories("src")

# Add Google Test
include(FetchContent)
FetchContent_Declare(
  googletest
  GIT_REPOSITORY https://github.com/google/googletest.git
  GIT_TAG        release-1.11.0
)
FetchContent_MakeAvailable(googletest)

# Add the tests directory
file(GLOB_RECURSE TEST_SOURCES "tests/*.cpp")
add_executable(runTests ${TEST_SOURCES})

# Link Google Test libraries
target_link_libraries(runTests gtest gtest_main)

# Find and link the xlnt library (if needed)
# find_package(xlnt REQUIRED)
# target_link_libraries(${TARGET_NAME} xlnt::xlnt)

# Add the Crow library (assuming it's in the 'lib/crow' folder, if needed)
# add_subdirectory(lib/crow)
# target_link_libraries(${TARGET_NAME} crow)

# Add the nlohmann/json library (assuming it's in the 'lib/json' folder, if needed)
# add_subdirectory(lib/json)
# target_link_libraries(${TARGET_NAME} nlohmann_json::nlohmann_json)