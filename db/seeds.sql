INSERT INTO menu(item,price,time)
VALUES("Latte", 5.00,3),("Capuccino", 5.50,2), ("Matcha Tea", 4.50,4), ("Drip Coffee", 3.00,10);


INSERT INTO orders(item_id,customer_name,delivered)
VALUES (1,"Tania",false),(2,"Carl",false),(3,"Tom",false),(3,"Frank",false),(1,"Phil",false),(1,"Cori",false);

-- // a cleaner way to do this is to have a stringified version of the JSON data so that we can store multiple item ids into the same order.