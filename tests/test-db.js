// para configurar la conexión a la base de datos durante las pruebas

const pool = require('../db');

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('¡Conexión exitosa! Hora del servidor:', res.rows[0].now);
  } catch (err) {
    console.error('Error de conexión:', err.message);
  } finally {
  
    pool.end();
  }
}

testConnection();