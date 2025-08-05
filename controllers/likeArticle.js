// controllers/articleController.js
const Article = require("../models/Article");

// Toggle like/unlike
exports.likeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article non trouvé" });

    const userId = req.user._id.toString();
    const index = article.likes.findIndex(id => id.toString() === userId);

    if (index === -1) {
      // Pas encore liké → on aime
      article.likes.push(userId);
    } else {
      // Déjà liké → on enlève le like
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
