// El controlador permite recibir peticiones, ejecuta el código SQL con la conexión y devuelve resultados.

const pool = require("../../db");


// Obtiene todos los autores registrados en la base de datos.
const getAuthors = async (req, res) => {
  const result = await pool.query("SELECT * FROM authors");
  res.json(result.rows);
};

// Crea un nuevo autor
const createAuthor = async (req, res) => {
  const { name, email, bio } = req.body;
  const result = await pool.query(
    "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
    [name, email, bio],
  );
  res.status(201).json(result.rows[0]);
};

//Buscar un autor por ID
const getAuthorById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);


//Si no se encuentra el autor, devuelve un error 404
    if (result.rows.length === 0)
    return res.status(404).json({ error: "Autor no encontrado" });

  res.json(result.rows[0]);
};

// Actualiza la información de un autor
const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;
  const result = await pool.query(
    "UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *",
    [name, email, bio, id],
  );
  res.json(result.rows[0]);
};

// Elimina un autor en específico usando su ID
const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM authors WHERE id = $1", [id]);
  res.json({ message: "Autor eliminado" });
};

// Actualiza sólo un dato de un autor específico usando su ID
const patchAuthor = async (req, res) => {
  const { id } = req.params;

  const { name, email, bio } = req.body;

  //coalesce le indica a la bd "Si el dato nuevo llega vacío, conserve el que ya estaba guardado"
  const result = await pool.query(
    "UPDATE authors SET name = COALESCE($1, name), email = COALESCE($2, email), bio = COALESCE($3, bio) WHERE id = $4 RETURNING *",
    [name, email, bio, id],
  );
  res.json(result.rows[0]);
};

//exportando el controlador
module.exports = {
  getAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  patchAuthor,
};