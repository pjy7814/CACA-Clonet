
CREATE DATABASE clonet_database;

show databases;
use clonet_database;

show tables;

drop table user;
drop table repository;
drop table mapping_repo_user;

select * from user;
select * from Repository;
select * from mapping_repo_user;

delete from user where user_id="b";

insert into user values ("user_id", "", "", "", "", "", "");
insert into repository values("TEST", "3.34.194.172");
insert into mapping_repo_user values("user1", "TEST");

SELECT @@AUTOCOMMIT;
SET AUTOCOMMIT = 1;

create table user(
	user_id char(10) primary key not null,
    user_pw char(20) not null,
    user_name char(10) not null,
    user_email char(30) not null,
    profilePic char(50),
    about varchar(1000),
    contact varchar(1000)
);

create table repository(
    repo_name char(15) primary key not null,
    repo_ec2_ip char(15) not null
);


select * from mapping_repo_user;

create table mapping_repo_user(
	user_id char(10),
    repo_name char(10),
    
    primary key(user_id, repo_name),
    foreign key (user_id) references user (user_id),
    foreign key (repo_name) references Repository (repo_name)
);

create table clonet_database.request(
	user_id char(10),
	repo_name char(100),
    x_pixel char(30),
    y_pixel char(30),
    request_context varchar(1000),
    
    
    foreign key (user_id) references user (user_id)
);


insert into user values('user1', 'passwd', '유저원', 'user1@gmail.com', "", "", "");
insert into user values('user2', 'passwd', '유저투', 'user1@gmail.com', "", "", "");
insert into user values('user3', 'passwd', '유저삼', 'user1@gmail.com', "", "", "");
select * FROM user where user_id="user3";
select * From user;

-- use mysql;

-- flush privileges; 

-- FLUSH PRIVILEGES;

-- drop table if exists repository;	
