const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel')
const User = require('../models/userModel')
const {text} = require("express");


// @desc   Get Goals
// @routes GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({user: req.user.id});
	res.status(200).json(goals)
})

// @desc   Set Goal
// @routes POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
	const goals = await Goal.create({
		text: req.body.text,
		user: req.user.id
	})
	res.status(200).json(goals)
})

// @desc   Update Goal
// @routes PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if(!goal){
		res.status(400);
		throw new Error('Goal not found');
	}
	
	const user = await User.findById(req.user.id)
	
	if(!user){
		res.status(401)
		throw new Error('User not found')
	}
	
	// Make sure the logged-in user matches th goal user
	if(goal.user.toString() !== user.id){
		res.status(401)
		throw new Error('User not authorized')
	}
	
	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
	res.status(200).json({
		message: `update msg${req.params.id}`
	})
})

// @desc   Delete Goal
// @routes DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!Goal.findById(req.params.id)){
		res.status(400);
		throw new Error('Goal not found');
	}
		
	const user = await User.findById(req.user.id)
	
	if(!user){
		res.status(401)
		throw new Error('User not found')
	}
	
	// Make sure the logged in user matches th goal user
	if(goal.user.toString() !== user.id){
		res.status(401)
		throw new Error('User not authorized')
	}
	
	await Goal.deleteOne({_id : req.params.id})
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