-- menu table 
CREATE TABLE menu(
	id uuid PRIMARY KEY,
	title text,
	details text,
	active boolean,
	price decimal,
	thumbnailUrl text,
	calories int,
	size map<int,text>,
	spicyLevel map<int,text>,
	createdDate uuid,
	modifiedDate uuid
);
-- data
INSERT INTO menu (id,title,details,active,price,thumbnailUrl,calories,size,spicyLevel,createdDate,modifiedDate)
VALUES ( now(),'BBQ Chicken','BBQ seasoned chicken smoked.',true,9.99,
'https://www.farmwifecooks.com/wp-content/uploads/2017/02/BBQChicken-1.jpg',400,
{0:'Small',1:'Large'},{0:'Mild',1:'Medium',2:'Hot'}, now(),now());

INSERT INTO menu (id,title,details,active,price,thumbnailUrl,calories,size,spicyLevel,createdDate,modifiedDate)
VALUES ( now(),'BBQ Pork Chop','BBQ seasoned pork chop smoked.',true,9.99,
'https://thestayathomechef.com/wp-content/uploads/2013/06/Thick-Grilled-Pork-Chops-2.jpg',400,
{0:'Small',1:'Large'},{0:'Mild',1:'Medium'}, now(),now());

-- serviceDate table
CREATE TABLE serviceDate (
	id uuid PRIMARY KEY,
	availableDate date,
	startHour time,
	endHour time,
	createdDate timestamp,
	stock set<text>
	modifiedDate timestamp

);

-- stock table
CREATE TABLE stock(
	id uuid PRIMARY KEY,
	menuId text,
	serviceDateId text,
	quantity int,
	purchased int
	modifiedDate timestamp
);

-- order table
CREATE TABLE order(
	id uuid PRIMARY KEY,
	orderNumber text
	customerName text,
	customerPhone text,
	createdDate timestamp
	serviceDateId text,
	validated boolean,
	cart list<text>,
	comment text
	modifiedDate timestamp
);
	
