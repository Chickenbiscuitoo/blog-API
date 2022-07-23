const Article = require('../models/articleModel')
const User = require('../models/userModel.js')
const Comment = require('../models/commentModel')

const async = require('async')
const asyncHandler = require('express-async-handler')

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
// @access  Private
const createArticle = asyncHandler(async (req, res, next) => {
	if (!req.body.text || !req.body.title || !req.body.author) {
		return next(err)
	}

	const article = await Article.create({
		title: req.body.title,
		author: req.body.author,
		text: req.body.text,
	})

	res.status(201).json({ article })
})

// @desc    Update article
// @route   PUT /api/article/:articleId
// @access  Private
const updateArticle = asyncHandler(async (req, res, next) => {
	const article = await Article.findById(req.params.articleId)

	if (!article) {
		next(err)
	}

	const updatedArticle = await Article.findByIdAndUpdate(
		req.params.articleId,
		req.body,
		{ new: true }
	)

	res.status(200).json(updatedArticle)
})

// @desc    Delete article
// @route   DELETE /api/article/:articleId
// @access  Private
const deleteArticle = asyncHandler(async (req, res, next) => {
	const article = await Article.findById(req.params.articleId)

	if (!article) {
		next(err)
	}

	await article.remove()

	res.status(200).json({ id: req.params.articleId })
})

// @desc    Get article comments
// @route   GET /api/article/:articleId/comments
// @access  Public
const getComments = (req, res, next) => {
	Article.findById(req.params.articleId)
		.populate('comments')
		.exec(function (err, article) {
			if (err) {
				return next(err)
			}

			res.status(200).json({
				comments: article.comments,
			})
		})
}

// @desc    Create new comment
// @route   POST /api/article/:articleId/comments
// @access  Private
const createComment = asyncHandler(async (req, res, next) => {
	if (!req.body.text) {
		return next(err)
	}

	const comment = await Comment.create({
		author: req.body.author,
		text: req.body.text,
		article: req.params.articleId,
	})

	Article.findOneAndUpdate(
		{ _id: req.params.articleId },
		{ $push: { comments: comment._id } },
		function (err, article) {
			if (err) {
				return next(err)
			}
			res.status(200).json(article)
		}
	)
})

// @desc    Get all users
// @route   GET /api/users
// @access	Private
const getAllUsers = (req, res, next) => {
	User.find({})
		.sort({ name: 1 })
		.exec(function (err, list_users) {
			if (err) {
				return next(err)
			}

			res.status(200).json({
				list_users,
			})
		})
}

// @desc    Get specific user
// @route   GET /api/user/:userId
// @access	Private
const getUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.userId)
	res.status(200).json({ user })
})

module.exports = {
	getStats,
	getAllArticles,
	createArticle,
	getArticle,
	updateArticle,
	deleteArticle,
	getComments,
	createComment,
	getAllUsers,
	getUser,
}
