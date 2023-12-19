import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
	goals: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: ''
}

export const createGoal = createAsyncThunk('goal/create', async (goalData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await goalService.createGoal(goalData, token)
	}catch (e) {
		const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const getGoals = createAsyncThunk('goal/getAll', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await goalService.getGoals(token)
	}catch (e) {
		const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const deleteGoal = createAsyncThunk('goal/delete', async (goalId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await goalService.deleteGoal(goalId, token)
	}catch (e) {
		const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const goalSlice = createSlice({
	name: 'goal',
	initialState,
	reducers: {
		reset: state => initialState
	},
	extraReducers: {
		[createGoal.pending]: (state) => {
			state.isLoading = true
		},
		[createGoal.fulfilled]: (state, action) => {
			state.isLoading = false
			state.isSuccess = true
			state.goals.push(action.payload)
		},
		[createGoal.rejected]: (state, action) => {
			state.isLoading = false
			state.isError = true
			state.message = action.payload
		},
		[getGoals.pending]: (state) => {
			state.isLoading = true
		},
		[getGoals.fulfilled]: (state, action) => {
			state.isLoading = false
			state.isSuccess = true
			state.goals = action.payload
		},
		[getGoals.rejected]: (state, action) => {
			state.isLoading = false
			state.isError = true
			state.message = action.payload
		},
		[deleteGoal.pending]: (state) => {
			state.isLoading = true
		},
		[deleteGoal.fulfilled]: (state, action) => {
			state.isLoading = false
			state.isSuccess = true
			// update goals in redux
			state.goals = state.goals.filter(goal => goal._id !== action.meta.arg)
		},
		[deleteGoal.rejected]: (state, action) => {
			state.isLoading = false
			state.isError = true
			state.message = action.payload
		}
	}
})

export default goalSlice.reducer

export const {reset} = goalSlice.actions