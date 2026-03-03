CREATE TABLE users (
    id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
)
