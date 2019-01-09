-- Create Database
CREATE DATABASE bamazonDB;

-- Use Database
USE bamazonDB;

-- Create table
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

-- Populate the database with products
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Annabelle the Doll", "Satanic object", 666.01, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dybbuk Box", "Satanic object", 1.01, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ouija Board", "DIY: Demon attachment", 20.25, 900);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dowsing Rods", "DIY: Demon attachment", 100.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("EMF Meter", "Ghost Hunting", 24.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flash Light", "Ghost Hunting", 14.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("REM POD", "Ghost Hunting", 300.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diary with Dope Pentagram Art on the Cover", "Post-Demon Posession Trauma Aid", 9.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bob Seger's Greatest Hits: 1994", "Post-Demon Posession Trauma Aid", 11.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MAGA Bumper Sticker", "DIY: Demon attachment", .69, 666);


