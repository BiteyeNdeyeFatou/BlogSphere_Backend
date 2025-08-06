const Article = require("../models/Article");

// GET /api/articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "username email");
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération", error });
  }
};

// GET /api/articles/:id
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("author", "username email");
    if (!article) return res.status(404).json({ message: "Article non trouvé" });

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Erreur", error });
  }
};

// POST /api/articles
exports.createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;

    const article = await Article.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Erreur de création", error });
  }
};

// PUT /api/articles/:id
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article non trouvé" });

    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;

    const updated = await article.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erreur", error });
  }
};

// DELETE /api/articles/:id
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    // Vérifie que l'utilisateur est l'auteur de l'article
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Action non autorisée" });
    }

    await article.remove();
    res.json({ message: "Article supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};

// PATCH /api/articles/:id/like
exports.likeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article non trouvé" });

    const userId = req.user._id.toString();
    const index = article.likes.findIndex(id => id.toString() === userId);

    if (index === -1) {
      article.likes.push(userId);
    } else {
      article.likes.splice(index, 1);
    }

    await article.save();
    res.status(200).json({
      likesCount: article.likes.length,
      liked: index === -1
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du like", error });
  }
};
