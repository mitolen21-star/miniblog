// Aquí se crean losn endpoints

const { Router } = require("express");
const router = Router();

const {
  getAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  patchAuthor
} = require("../controllers/authorsController");

router.get("/", getAuthors);

router.post("/", createAuthor);

router.get("/:id", getAuthorById);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

router.patch("/:id", patchAuthor);

module.exports = router;