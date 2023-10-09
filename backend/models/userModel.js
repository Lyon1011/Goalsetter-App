const mongoose = require('mongoose')
const userModel = mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please add a name']
	},
	email: {
		type: String,
		require: [true, 'Please add a email'],
		unique: true
	},
	password: {
		type: String,
		require: [true, 'Please add a password']
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('User', userModel)