// const User = require('../models/User');
const Comment = require('../models/Comment');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getComments = asyncHandler(async (req, res, next) => {
  // res.status(200).json(res.advancedResults);
  const comments = await Comment.find();
  res.status(200).json({
    success: true,
    data: comments
  })
});



// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.create(req.body);
  res.status(201).json({
    success: true,
    data: comment
  });
});



// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getComment = asyncHandler(async (req, res, next) => {
  // if comment with such id not found return error 
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: comment
  });
});




// @desc      Update user * whitelist
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
exports.updateComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: comment
  });
});


// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private/Admin
exports.deleteComment = asyncHandler(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {}
  });
});

