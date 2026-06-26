const { Router } = require("express");
const router = Router();

const {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  patchComment
} = require("../controllers/commentsController");

router.get("/", getComments); 

router.get("/:id", getCommentById); 

router.post("/", createComment); 

router.put("/:id", updateComment);

router.patch("/:id", patchComment); 

router.delete("/:id", deleteComment); 

module.exports = router;