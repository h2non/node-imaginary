BABEL = ./node_modules/.bin/babel
MOCHA = ./node_modules/.bin/mocha
STANDARD = ./node_modules/.bin/standard

default: all
all: test
test: mocha

compile:
	$(BABEL) lib --out-dir src

lint:
	$(STANDARD) lib bin/imaginary

mocha: lint compile
	$(MOCHA) --reporter spec --ui tdd

publish: test compile
	@npm publish
