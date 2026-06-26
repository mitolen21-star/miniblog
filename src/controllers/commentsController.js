const pool = require("../../db");

const getComments = async (req, res) => {
  const result = await pool.query("SELECT * FROM comments");
  res.json(result.rows);
};

const createComment = async (req, res) => {
  const { content, post_id, author_id } = req.body;
  const result = await pool.query(
    "INSERT INTO comments (content, post_id, author_id) VALUES ($1, $2, $3) RETURNING *",
    [content, post_id, author_id],
  );
  res.status(201).json(result.rows[0]);
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM comments WHERE id = $1", [id]);

  if (result.rows.length === 0)
    return res.status(404).json({ error: "Comentario no encontrado" });

  res.json(result.rows[0]);
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content, post_id, author_id } = req.body;
  const result = await pool.query(
    "UPDATE comments SET content = $1, post_id = $2, author_id = $3 WHERE id = $4 RETURNING *",
    [content, post_id, author_id, id],
  );
  res.json(result.rows[0]);
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM comments WHERE id = $1", [id]);
  res.json({ message: "Comentario eliminado" });
};

const patchComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  
  const result = await pool.query(
    "UPDATE comments SET content = COALESCE($1, content) WHERE id = $2 RETURNING *",
    [content, id],
  );
  res.json(result.rows[0]);
};

module.exports = {
  getComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  patchComment
};