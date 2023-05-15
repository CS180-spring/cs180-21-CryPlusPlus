CURRENTDIR := $(shell pwd)
EXEFILE		:= boostServer
CC := g++
LDFLAGS := -std=c++11

all: boo
	$(CC) $(LDFLAGS) $(CURRENTDIR)/src/*.cpp -o $(CURRENTDIR)/build/$(EXEFILE)  

boo: 
	mkdir -p $(CURRENTDIR)/build
