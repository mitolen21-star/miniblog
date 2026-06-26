// db index.js: código que permite llamar a la bd creando un puente "pool".

// Lee el archivo .env para acceder a las variabeles ocultas

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;