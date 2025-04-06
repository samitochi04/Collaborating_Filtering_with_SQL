# Filtrage collaboratif avec  SQl

## TECH STACK
- PostgreSQL
- Docker-compose
- Flask
- React JS

## Objective
Créer un système de recommendation  à l'aide de requetes SQL. The train_purchases.csv contains the user's session_id who bought an item(item_id) at date and train_session.csv contains the user's session_id who view zn item(item_id) at date. with these data, we should create a system that will recommend x item when a user view x item or after he purchased x item.
1. Step 1 :
- Create two docker containers with docker-compose, one will contain the database (you will use the 20 first lines of the csv file and create a file with requests to do so for a postgre database) and the other will contain the select requests to call the posstgre container containing the data.

2. Step 2 :
- Create a proof of concept with an api flask back-end and a api.md with all the url needed to test the backend in postman.

3. Step 3 :
- Create a front end in React Js that will use the back end API to show the data on an interactif dashboard.

4. Step 4 :
- Create a improve.md with potential improvement in the project.

