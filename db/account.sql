drop table if exists account;
create table account(
	user_id int not null auto_increment,
    username varchar(60) not null,
    password varchar(60) not null,
    primary key (user_id)
);
INSERT INTO account (username, password) VALUES ("def", "1");
select * from account
