cmake_minimum_required(VERSION 3.10)

# Set the name of the project and the target executable
project(DocumentDatabase)
set(TARGET_NAME document_database)

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

# Enable CTest and add the tests
enable_testing()
add_test(NAME MyTests COMMAND runTests)
