const Article = require('../models/articleModel')
const User = require('../models/userModel.js')
const Comment = require('../models/commentModel')

const async = require('async')

// @desc    Get API Stats
// @route   GET /api/
// @access  Public
const getStats = (req, res) => {
	async.parallel(
		{
			user_count: function (callback) {
				User.countDocuments({}, callback)
			},
			article_count: function (callback) {
				Article.countDocuments({}, callback)
			},
			comment_count: function (callback) {
				Comment.countDocuments({}, callback)
			},
		},
		function (err, result) {
			if (err) {
				return next(err)
			}
			res.status(200).json({
				user_count: result.user_count,
				article_count: result.article_count,
				comment_count: result.comment_count,
			})
		}
	)
}

// @desc    Get list of articles
// @route   GET /api/articles
// @access  Public
const getAllArticles = (req, res, next) => {
	Article.find({})
		.sort({ createdAt: 1 })
		.exec(function (err, list_articles) {
			if (err) {
				return next(err)
			}

			res.status(200).json({
				list_articles,
			})
		})
}

// @desc    Get specific article
// @route   GET /api/article/:articleId
// @access  Public
const getArticle = (req, res, next) => {
	Article.findById(req.params.articleId)
		.populate('author')
		.populate('comments')
		.exec(function (err, article) {
			if (err) {
				return next(err)
			}

			res.status(200).json({
				article,
			})
		})
}

// @desc    Create new article
// @route   POST /api/article
// @access  Public
const createArticle = (req, res, next) => {
	const article = new Article({
		title: req.body.title,
		author: req.body.author,
		text: req.body.text,
	})

	article.save(function (err, article) {
		if (err) {
			return next(err)
		}
		res.status(201).json({ article })
	})
}

module.exports = {
	getStats,
	getAllArticles,
	createArticle,
	getArticle,
}
