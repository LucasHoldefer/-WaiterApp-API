CREATE DATABASE waiterapp;
DROP DATABASE waiterapp;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  icon VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  table VARCHAR NOT NULL,
  status VARCHAR NOT NULL,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders_products (
  order_id UUID,
  product_id UUID,
  quantity INTEGER,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS products (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  imagePath VARCHAR NOT NULL,
  price DECIMAL NOT NULL,
  category_id UUID,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

DROP TABLE products;
DROP TABLE products_ingredients;
DROP TABLE ingredients;
DROP TABLE orders_products;
DROP TABLE orders;
DROP TABLE categories;

CREATE TABLE IF NOT EXISTS ingredients (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  icon VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS products_ingredients (
  ingredient_id UUID,
  product_id UUID,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
