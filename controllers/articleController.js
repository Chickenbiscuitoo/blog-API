const Article = require('../models/articleModel')
const User = require('../models/userModel.js')

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
		},
		function (err, result) {
			res.status(200).json({
				user_count: result.user_count,
				article_count: result.article_count,
			})
		}
	)
}

module.exports = {
	getStats,
}
