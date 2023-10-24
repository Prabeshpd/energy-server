dev_compose_file := docker-compose.dev.yml
test_compose_file := docker-compose.test.yml

.PHONY: dev-start dev-stop test

dev-start:
	docker compose -f $(dev_compose_file) up -d
	yarn dev:migrate
	yarn seed
	yarn start:dev

dev-stop:
	docker compose -f $(dev_compose_file) stop

test:
	docker compose -f $(test_compose_file) up -d
	yarn test:migrate
	yarn test
	docker compose -f $(test_compose_file) stop
