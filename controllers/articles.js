// const User = require('../models/User');
const Article = require('../models/Article')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getArticles = asyncHandler(async (req, res, next) => {
  await res.status(200).json(res.advancedResults)
})

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.create(req.body)
  res.status(201).json({
    success: true,
    data: article,
  })
})

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id)
  if (!article) {
    return next(
      new ErrorResponse(`Article not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: article,
  })
})

// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
exports.updateArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  // if the article with the id is not found return error
  if (!article) {
    return next(
      new ErrorResponse(`Article not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: article,
  })
})


// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private/Admin
exports.deleteArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findByIdAndDelete(req.params.id)

  // if the article with the id is not found return error
  if (!article) {
    return next(
      new ErrorResponse(`Article not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})
