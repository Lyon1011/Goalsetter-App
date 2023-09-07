const asyncHandler = require('express-async-handler');
// @desc   Get Goals
// @routes GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: 'get msg'
	})
})
// @desc   Set Goal
// @routes POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: 'set msg'
	})
})
// @desc   Update Goal
// @routes PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please to enter the text');
	}
	res.status(200).json({
		message: `update msg${req.params.id}`
	})
})
// @desc   Delete Goal
// @routes DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: `delete msg${req.params.id}`
	})
})

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
}