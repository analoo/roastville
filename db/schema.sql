DROP DATABASE IF EXISTS barista_db;

CREATE DATABASE barista_db;
USE barista_db;

CREATE TABLE menu(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(70) NOT NULL,
    price decimal(10,2) NOT NULL
);

CREATE TABLE customer(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(70),
    total_spend INT
);

CREATE TABLE orders
(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id int NOT NULL,
    customer_id int,
	delivered BOOLEAN DEFAULT false,
    FOREIGN KEY (order_id) REFERENCES menu(id),
    FOREIGN KEY (customer_id) REFERENCES customer(id)

);