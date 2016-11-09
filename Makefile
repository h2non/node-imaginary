MOCHA = ./node_modules/.bin/mocha
STANDARD = ./node_modules/.bin/standard

default: all
all: test
test: mocha

lint:
	$(STANDARD) lib bin/imaginary

mocha: lint
	$(MOCHA) --reporter spec --ui tdd

publish:
	git push --tags origin HEAD:master
