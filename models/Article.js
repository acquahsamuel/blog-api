const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  subTitle: {
    type: String,
  },

  content: {
    type: String,
    default: true,
  },

  url: String,

  category: {
    type: String,
    enum: ["bussiness", "politics", "entertainment", "sports", "general"],
    default: "general",
  },

  language: {
    type: String,
    enum: ["en", "tr", "es"],
    default: "en",
  },

  status: {
    type: String,
    enum: ["private", "public"],
    default: "public",
  },

  allowComments: {
    type: Boolean,
    required: true,
  },

  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //FIXME: @dd required : true
  },

  //FIXME: { if array of just object }
  comments: {
    type: mongoose.Schema.ObjectId,
    ref: "Comment",
    //FIXME: @dd required : true
  },
});

ArticleSchema.pre("save", function (next) {
  this.url = slugify(this.title, {
    lower: true,
  });
  next();
});

module.exports = mongoose.model("Article", ArticleSchema);
