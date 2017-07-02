default: start
.PHONY: build dev logs start stop

build:
	docker image build -t mischkew/findmeaflat ./

start:
	docker container run -d --rm --name findmeaflat \
		-v findmeaflat:/var/findmeaflat-db \
		mischkew/findmeaflat

stop:
	docker container stop findmeaflat

dev:
	docker container run -it --rm \
	-v $$(pwd):/app \
	-v findmeaflat:/var/findmeaflat-db \
	mischkew/findmeaflat sh

logs:
	docker container logs -f findmeaflat
