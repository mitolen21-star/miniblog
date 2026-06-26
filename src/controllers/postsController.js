const pool = require("../../db");

const getPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
  res.json(result.rows);
  } catch (error) {
  res.status(500).json({ error: "Error al obtener las publicaciones" });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    res.json(result.rows[0]); 
  } catch (error) {
    res.status(500).json({ error: "Error al buscar la publicación" });
  }
};

const createPost = async (req, res) => {
  const { title, content, author_id } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, author_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content)
    return res.status(400).json({ error: "Faltan datos" });

  try {
    const result = await pool.query(
      "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "No existe" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM posts WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "La publicación no existe" });
    }
    res.json({ message: "Publicación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno al intentar eliminar" });
  }
};


const patchPost = async (req, res) => {
  const { id } = req.params;

  
  const { title, content, published, author_id } = req.body;

  if (!title && !content && published === undefined && !author_id)
    return res.status(400).json({ error: "Faltan datos" });
  try {

    const result = await pool.query(
      "UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), published = COALESCE($3, published), author_id = COALESCE($4, author_id) WHERE id = $5 RETURNING *",
      [title, content, published, author_id, id],
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "No existe" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error interno al actualizar" });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  patchPost,
};

