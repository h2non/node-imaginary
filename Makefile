MOCHA = ./node_modules/.bin/mocha

default: all
all: test
test: mocha

mocha:
	$(MOCHA) --reporter spec --ui tdd

publish:
	git push --tags origin HEAD:master
