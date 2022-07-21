const express = require('express')
const router = express.Router()

// Require controller modules

// Get API stats
router.get('/', (req, res) =>
	res.json({ message: 'GET api stats not implemented' })
)

// Get all articles
router.get('/articles', (req, res) =>
	res.json({ message: 'GET all articles not implemented' })
)
// Get specific article
router.get('/article/:articleId', (req, res) =>
	res.json({ message: 'GET specific article not implemented' })
)
// Create new article
router.post('/article', (req, res) =>
	res.json({ message: 'POST(Create) new article not implemented' })
)
// Update article
router.put('/article/:articleId', (req, res) =>
	res.json({ message: 'PUT(Update) article not implemented' })
)
// Delete article
router.delete('/article/:articleId', (req, res) =>
	res.json({ message: 'DELETE new article not implemented' })
)

// Get article comments
router.get('/article/:articleId/comments', (req, res) =>
	res.json({ message: 'GET all comments not implemented' })
)
// Create new comment
router.post('/article/:articleId/comments', (req, res) =>
	res.json({ message: 'POST(Create) new comment not implemented' })
)

// Get all users
router.get('/users', (req, res) =>
	res.json({ message: 'GET all users not implemented' })
)
// Get specific user
router.get('/user/:userId', (req, res) =>
	res.json({ message: 'GET specific user implemented' })
)

module.exports = router
