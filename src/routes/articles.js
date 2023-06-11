const express = require("express");
const Article = require("../models/Article");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles");
const router = express.Router();

router
  .route("/")
  .get(advancedResults(Article), getArticles)
  .post(createArticle);

router.route("/:id")
.get(getArticle)
.put(updateArticle)
.delete(deleteArticle);

module.exports = router;
