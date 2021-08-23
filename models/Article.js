const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    //FIXME: @dd required : true
  },

  url: String,

  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    //FIXME: @dd required : true
  },

  language: {
    type: String,
    enum: ['en', 'tr', 'es'],
    default: 'en'
  },
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
  },
  status: {
    type: String,
    enum: ['private', 'public'],
    default: "public"
  },

  allowComments: {
    type: Boolean,
    required: true
  },

  content: {
    type: String,
    default: true
  },

  image: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },

  //FIXME: { if array of just object }
  comments: {
    type: mongoose.Schema.ObjectId,
    ref: "Comment"
    //FIXME: @dd required : true
  }
});


ArticleSchema.pre("save", function (next) {
  this.url = slugify(this.title, {
    lower: true
  });
  next();
});


module.exports = mongoose.model("Article", ArticleSchema);