const express = require("express");
const {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
} = require("../controllers/articles");
const router = express.Router();

const Article = require("../models/Article");
// const router = express.Router({
//     mergeParams: true
// });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
    .route("/")
    .get(advancedResults(Article), getArticles)
    .post(createArticle);

router.route("/:id")
    .get(getArticle)
    .put(updateArticle)
    .delete(deleteArticle);

module.exports = router;
