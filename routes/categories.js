const express = require('express');
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categories");
const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(createCategory)


router.route('/:id')
    .put(updateCategory)
    .delete(deleteCategory)
    .get(getCategory)


module.exports = router;
