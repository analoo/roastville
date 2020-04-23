INSERT INTO menu(name,price)
VALUES("Latte", 5.00),("Capuccino", 5.50), ("Matcha Tea", 4.50), ("Drip Coffee", 3.00);


INSERT INTO customer(name,total_spend)
VALUES ("Tom", 0), ("Lisa", 0), ("Mark",0), ("Crystal", 0);

INSERT INTO orders(order_id,item_id,customer_id,delivered)
VALUES (1,1,1,false),(1,2,1,false),(1,3,1,false),(2,3,2,false),(2,1,2,false),(3,1,3,false);

-- // a cleaner way to do this is to have a stringified version of the JSON data so that we can store multiple item ids into the same order.