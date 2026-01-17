require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");
const isDocker = fs.existsSync("/.dockerenv");
const host = isDocker ? "postgres" : "localhost";

const pool = new Pool({
  host,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "crypto_user",
  password: String(process.env.DB_PASSWORD || "admin@123"),
  database: process.env.DB_NAME || "crypto_sentinel"
});

module.exports = pool;
