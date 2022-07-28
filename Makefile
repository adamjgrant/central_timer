install:
	npm install

build:
	python3 -m http.server 3001

test:
	npx cypress open

new_component:
	./new_component.sh