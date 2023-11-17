COMPOSE = docker-compose -p mock_moderation

.PHONY: run
run:
	$(COMPOSE) build
	$(COMPOSE) up

.PHONY: down
down:
	$(COMPOSE) down --volumes --rmi local