drop table if exists orders;
create table orders (
	state varchar(60),
	order_id int not null auto_increment primary key,
    username varchar(60) not null,
    dishes JSON,
    created_at date not null,
    updated_at datetime not null
);

select * from orders;
