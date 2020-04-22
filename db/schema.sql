CREATE DATABASE barista_db;
USE barista_db;

CREATE TABLE orders
(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order int NOT NULL,
	delivered BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE menu(
    id int NOT NULL AUTO_INCREMENT PRIMARY,
    name varchar(70) NOT NULL,
    price decimal(10,2) NOT NULL
);

CREATE TABLE customer(
    id INT NOT NULL AUTO_INCREMENT PRIMARY,
    name varchar(70),
    total_spend INT,

)
