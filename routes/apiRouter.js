const express = require('express')
const router = express.Router()

// Require controller modules
const {
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
} = require('../controllers/articleController')

router.get()

// Get API stats
router.get('/', getStats)

// Get all articles
router.get('/articles', getAllArticles)

// Get specific article
router.get('/article/:articleId', getArticle)

// Create new article
router.post('/article', createArticle)

// Update article
router.put('/article/:articleId', updateArticle)

// Delete article
router.delete('/article/:articleId', deleteArticle)

// Get article comments
router.get('/article/:articleId/comments', getComments)

// Create new comment
router.post('/article/:articleId/comments', createComment)

// Get all users
router.get('/users', getAllUsers)

// Get specific user
router.get('/user/:userId', getUser)

module.exports = router
