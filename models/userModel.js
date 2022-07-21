const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
	},
})

module.exports = mongoose.model('User', UserSchema)
