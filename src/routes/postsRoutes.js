const { Router } = require("express");
const router = Router();

const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  patchPost
} = require("../controllers/postsController");

router.get("/", getPosts); 

router.get("/:id", getPostById); 

router.post("/", createPost); 

router.put("/:id", updatePost);

router.patch("/:id", patchPost); 

router.delete("/:id", deletePost); 

module.exports = router; 