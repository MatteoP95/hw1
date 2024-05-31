create database wikifake;
use wikifake;
CREATE TABLE Utenti(
	id int PRIMARY KEY auto_increment,
	nome varchar(255) not null unique,
	password varchar(255) not null
)Engine = InnoDB;