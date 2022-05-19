PROJECT=MiniGame

.PHONY: all clean

all: $(PROJECT)

clean:
	rm obj
	rm $(PROJECT)

$(PROJECT): src/main.cpp
	g++ -o $@ $^