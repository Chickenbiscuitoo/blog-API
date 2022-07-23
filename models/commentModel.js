const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema(
	{
		author: { type: String, required: true },
		text: { type: String, required: true },
		article: { type: Schema.Types.ObjectId, required: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)
