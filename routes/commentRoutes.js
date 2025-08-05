const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createComment,
  getCommentsByArticle
} = require("../controllers/commentController");

const router = express.Router();

// Ajouter un commentaire à un article
router.post("/:articleId/comments", protect, createComment);

// Récupérer les commentaires d’un article
router.get("/:articleId/comments", getCommentsByArticle);

module.exports = router;
