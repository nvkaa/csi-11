drop table if exists account;
create table account (
	user_id int not null auto_increment primary key,
    username varchar(60) not null unique,
    password varchar(60) not null,
    status varchar(60) 
);
insert into account (username, password) values ("def", "1");

UPDATE account SET status = "testing" WHERE username = "def";
select * from account;

drop table if exists orders;
create table orders (
	status varchar(60),
	order_id int not null auto_increment primary key,
    username varchar(60) not null,
    dishes JSON
);

select * from orders