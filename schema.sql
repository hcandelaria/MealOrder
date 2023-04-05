-- item table 
CREATE TABLE item (
	item_id uuid PRIMARY KEY,
	name text,
	description text,
	status text,
	price decimal,
	thumbnail_url text,
	calories int,
	size map<int,text>,
	spicy_level map<int,text>,
	available_date timestamp,
	recurrence text,
	open_hour time,
	close_hour time,
	total_quantity int,
	current_quantity int,
	created_date timestamp,
	modified_date timestamp
);

-- shopping_cart table
--item.name item.price item.thumbnail_url item.size item.spice_level item.calories
--pending, reviewed, verified, rejected
CREATE TABLE shopping_cart(
	shopping_cart_id uuid PRIMARY KEY,
	service_date text,
	items frozen<list<item_type>>, 
	customer_name text,
	customer_phone text,
	status text, 
	comments text,
	created_date timestamp,
	modified_date timestamp
);

-- customer table
CREATE TABLE customer (
    customer_id uuid PRIMARY KEY,
    first_name text,
    last_name text,
    email text
);

-- review table
CREATE TABLE review (
    review_id uuid PRIMARY KEY,
    customer_id uuid,
    menu_id uuid,
    rating int,
    comment text,
    review_date timestamp
) WITH CLUSTERING ORDER BY (menu_id ASC);

CREATE TYPE item_type (	name text,description text,status text,price decimal,thumbnail_url text,calories int,size text,spicy_level text,available_date timestamp,recurrence text,open_hour time,close_hour time,total_quantity int,current_quantity int);

-- service_date table
-- stock set<uuid>
-- daily, weekly or monthly
-- CREATE TABLE service_date (

-- );

-- stock table
-- item_detail map<varchar, varchar>, --item.name item.price item.thumbnail_url item.size item.spice_level item.calories
-- CREATE TABLE stock(
-- 	stock_id uuid,
-- 	item_id uuid,
-- 	service_date_id uuid,
-- 	created_date timestamp,
-- 	modified_date timestamp,
-- 	PRIMARY KEY(service_date_id,current_quantity)
-- );
-- data item
INSERT INTO item ( item_id,name,description,status,price, thumbnail_url,calories,size,spicy_level,available_date,recurrence,open_hour,close_hour,total_quantity,current_quantity,created_date,modified_date)
VALUES ( now(),'BBQ Chicken','BBQ seasoned chicken smoked.','active',9.99,
'https://www.farmwifecooks.com/wp-content/uploads/2017/02/BBQChicken-1.jpg',400,
{0:'Small',1:'Large'},{0:'Mild',1:'Medium',2:'Hot'},'2023-01-07 EDT','weekly',
'11:00:00','19:00:00',10,10,toTimestamp(now()),toTimestamp(now()));

INSERT INTO item ( item_id,name,description,status,price, thumbnail_url,calories,size,spicy_level,available_date,recurrence,open_hour,close_hour,total_quantity,current_quantity,created_date,modified_date)
VALUES ( now(),'BBQ Pork Chop','BBQ seasoned pork chop smoked.','active',9.99,
'https://thestayathomechef.com/wp-content/uploads/2013/06/Thick-Grilled-Pork-Chops-2.jpg',400,
{0:'Small',1:'Large'},{0:'Mild',1:'Medium'},'2023-01-07 EDT','weekly',
'11:00:00','19:00:00',10,10,toTimestamp(now()),toTimestamp(now()));

INSERT INTO item ( item_id,name,description,status,price, thumbnail_url,calories,size,spicy_level,available_date,recurrence,open_hour,close_hour,total_quantity,current_quantity,created_date,modified_date)
VALUES ( now(),'BBQ Pork Steak','BBQ seasoned steak smoked.','inactive',19.99,
'https://dwkujuq9vpuly.cloudfront.net/news/wp-content/uploads/2019/05/steak-on-bbq_main.jpg',400,
{0:'Small',1:'Large'},{0:'Mild',1:'Medium'},'2023-01-07 EDT','weekly',
'11:00:00','19:00:00',10,10,  toTimestamp(now()),toTimestamp(now()));

-- data stock
INSERT INTO stock (stock_id,item_id,total_quantity,current_quantity,created_date,modified_date)
VALUES(now(),b8899600-c220-11ed-895d-add9e5bd9a56,10,10,toTimestamp(now()),toTimestamp(now()));
INSERT INTO stock (stock_id,item_id,total_quantity,current_quantity,created_date,modified_date)
VALUES(now(),b8880f60-c220-11ed-895d-add9e5bd9a56,10,10,toTimestamp(now()),toTimestamp(now()));
INSERT INTO stock (stock_id,item_id,total_quantity,current_quantity,created_date,modified_date)
VALUES(now(),956e0c40-c221-11ed-895d-add9e5bd9a56,10,10,toTimestamp(now()),toTimestamp(now()));

-- data service_date
INSERT INTO service_date(service_date_id,available_date,recurrence,status,open_hour,close_hour,created_date,modified_date)
VALUES(now(),'2023-01-07 EDT','weekly','active','11:00:00','19:00:00',toTimestamp(now()),toTimestamp(now()));

INSERT INTO mealorder.shopping_cart (shopping_cart_id,service_date,customer_name,customer_phone,status, comments, created_date, modified_date)
VALUES (now(),'4/1/2023','John Smith','1234567890', 'pending','Test', toTimestamp(now()),toTimestamp(now()));
