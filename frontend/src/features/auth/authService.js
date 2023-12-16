import axios from "axios";

const API_URL = '/api/users/'

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
	
	// Add token
	if(response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}
	
	return response.data
}
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
	
	// Add token
	if(response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}
	
	return response.data
}

export const logout = () => {
	localStorage.removeItem('user')
}

const authService = {
	register,
	login,
	logout
}

export default authService