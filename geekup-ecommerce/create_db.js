const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  await connection.query(
    'CREATE DATABASE IF NOT EXISTS geekupdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;'
  );
  console.log('Database created!');
  await connection.end();
}
main();
