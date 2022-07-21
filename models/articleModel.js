const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Please add a title'],
			maxLength: 30,
			minLength: 3,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'Author',
			required: true,
		},
		text: {
			type: String,
			required: [true, 'Please add a text value'],
		},
	},
	{
		timestamps: true,
	}
)

// Virtual for book's URL
ArticleSchema.virtual('url').get(function () {
	return '/api/article/' + this._id
})

module.exports = mongoose.model('Article', ArticleSchema)
