import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "./authService";
import register from "../../pages/Register";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

export const authRegister = createAsyncThunk('auth/register', async (user, thunkAPI) => {
	try {
		return await authService.register(user)
	}catch (e) {
		const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
		return thunkAPI.rejectWithValue(message)
	}
})
export const authLogin = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user)
	}catch (e) {
		const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const authLogout = createAsyncThunk('auth/logout', async () => {
	await authService.logout()
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.message = false
		}
	},
	extraReducers: {
		[authRegister.pending]: (state) => {
			state.isLoading = true
		},
		[authRegister.fulfilled]: (state, action) => {
			state.isLoading = false
			state.isSuccess = true
			state.user = action.payload
		},
		[authRegister.rejected]: (state, action) => {
			state.isLoading = false
			state.isError = true
			state.message = action.payload
			state.user = null
		},
		[authLogout.fulfilled]: (state) => {
			state.user = null
		},
		[authLogin.pending]: (state) => {
			state.isLoading = true
		},
		[authLogin.fulfilled]: (state, action) => {
			state.isLoading = false
			state.isSuccess = true
			state.user = action.payload
		},
		[authLogin.rejected]: (state, action) => {
			state.isLoading = false
			state.isError = true
			state.message = action.payload
			state.user = null
		},
	}
})

export const {reset} = authSlice.actions

export default authSlice.reducer