const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  likeArticle
} = require("../controllers/articleController");

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", protect, createArticle);
router.put("/:id", protect, updateArticle);
router.delete("/:id", protect, deleteArticle);
router.patch("/:id/like", protect, likeArticle);

module.exports = router;
