DROP DATABASE IF EXISTS recycle_db;
CREATE DATABASE recycle_db;
\c recycle_db


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email varchar NOT NULL,
  password varchar NOT NULL,
  location point,
  phone int NOT NULL,
  role varchar NOT NULL
);


CREATE TABLE garbage (
  id SERIAL PRIMARY KEY,
  type VARCHAR,
  size int
);


CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  state_order varchar,
  garbage_id int NOT NULL,
  user_id int NOT NULL,
  FOREIGN KEY(garbage_id) REFERENCES garbage ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(user_id) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO users(name, email, password, location, phone, role) 
VALUES
('Abdulrab Bin Taleb', 'abdulrab.bt@hotmail.com', '0000', point(700, 800), 0545298122, 'admin');

INSERT INTO garbage(type, size) 
VALUES
('Plastic', 15);

INSERT INTO orders(state_order, garbage_id, user_id) 
VALUES
('processing', 1, 1);




