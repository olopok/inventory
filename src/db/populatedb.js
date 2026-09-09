const dotenv = require("dotenv");
dotenv.config();

const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(200) NOT NULL,
    quantity INT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

INSERT INTO categories (name) VALUES
  ('PAINTS'), ('TOOLS'), ('FILLERS');

INSERT INTO products (name, quantity, category_id) VALUES
  ('Vinyl paint', 5, 1),
  ('Acrylic paint', 3, 1),
  ('Wood stain', 2, 1),
  ('Brush', 12, 2),
  ('Roller', 5, 2),
  ('Scraper', 1, 2),
  ('Ready mixed', 3, 3),
  ('Wood filler', 1, 3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.DB_URI,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
