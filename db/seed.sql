DROP DATABASE IF EXISTS recycle_db;
CREATE DATABASE recycle_db;
\c recycle_db


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email varchar  UNIQUE NOT NULL,
  password varchar NOT NULL,
  location point,
  phone int NOT NULL,
  is_admin boolean DEFAULT 'f'
);


CREATE TABLE garbage (
  id SERIAL PRIMARY KEY,
  type VARCHAR,
  size int
);

CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email varchar  UNIQUE NOT NULL,
  password varchar NOT NULL,
  location point,
  phone int NOT NULL,
  is_admin boolean DEFAULT 'f'
);


CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  state_order varchar,
  garbage_id int NOT NULL,
  user_id int NOT NULL,
  driver_id int NOT NULL,
  FOREIGN KEY(garbage_id) REFERENCES garbage ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(driver_id) REFERENCES drivers ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(user_id) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE
);



-- INSERT INTO users(name, email, password, location, phone, is_admin)
-- VALUES
-- ('abdulrab', 'abdulrab.bt@hotmail.com', '0000', point(46.77280525511687, 24.658938094581643), 0545298122,'f'),
-- ('mod', 'abdulb.bt@hotmail.com', '0000', point(48.75280565511687, 25.658938095781643), 0545298122,'f');


-- INSERT INTO drivers(name, email, password, location, phone, is_admin)
-- VALUES
-- ('bastawesi', 'abdulb.bt@hotmail.com', '0000', point(46.75280525511687, 24.658938094581643), 0545298122,'f'),
-- ('antr', 'ablrab.bt@hotmail.com', '0000', point(46.719846270787116, 24.69013561957955), 0545668122,'f');

-- INSERT INTO garbage(type, size) 
-- VALUES
-- ('Plastic', 15);

-- INSERT INTO orders(state_order, garbage_id, user_id, driver_id ) 
-- VALUES
-- ('processing', 1, 1,1),
-- ('processing', 1, 2,2),
-- ('finish', 1, 2,1);