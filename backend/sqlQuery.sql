create database inventory;

use inventory;

create table auth (
	id int primary key auto_increment,
	fName varchar(200),
    lName varchar(200),
    email varchar(200) unique,
    phone varchar(200),
    password varchar(200)
);

create table product (
	id int primary key auto_increment,
	skuNo varchar(200) unique,
    name varchar(200),
    category varchar(200),
    description varchar(200),
    quantity varchar(200),
    price varchar(200),
    vendor varchar(200)
);

create table vendor (
id int primary key auto_increment,
name varchar(200) unique
);

create table category (
id int primary key auto_increment,
name varchar(200) unique
);

create table sales (
	id int primary key auto_increment,
    customer varchar(200),
    productName varchar(200),
    vandorName varchar(200),
    quantity int,
    price int
);

create table purchase (
    id int auto_increment primary key,
product varchar(200),
vendor varchar(200),
quantity int,
selling_price int,
price int,
status varchar(200)
);