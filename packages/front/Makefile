install:
	docker run -v "$(PWD):/home/node/app" -w /home/node/app node:9.3.0 npm i

build: install
	docker run -v "$(PWD):/home/node/app" -w /home/node/app node:9.3.0 npm run build
