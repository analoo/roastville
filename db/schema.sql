DROP DATABASE IF EXISTS barista_db;

CREATE DATABASE barista_db;
USE barista_db;

CREATE TABLE menu(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item varchar(70) NOT NULL,
    price decimal(10,2) NOT NULL,
    time int NOT NULL
);

CREATE TABLE orders
(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item_id int NOT NULL,
    customer_name VARCHAR(10),
	delivered BOOLEAN DEFAULT false,
    FOREIGN KEY (item_id) REFERENCES menu(id)

);