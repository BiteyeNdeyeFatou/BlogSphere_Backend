const Comment = require("../models/Comment");
const Article = require("../models/Article");

// Créer un commentaire
const createComment = async (req, res) => {
  const { content } = req.body;
  const { articleId } = req.params;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    const comment = await Comment.create({
      content,
      article: articleId,
      author: req.user.id
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du commentaire", error });
  }
};

// Afficher les commentaires d’un article
const getCommentsByArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    const comments = await Comment.find({ article: articleId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du chargement des commentaires", error });
  }
};

module.exports = {
  createComment,
  getCommentsByArticle
};
