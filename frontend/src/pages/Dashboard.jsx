import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import GoalForm from "../components/GoalForm";
import {getGoals, reset} from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

function Dashboard(props) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	const {user} = useSelector(state => state.auth)
	const {goals, isLoading, isError, message} = useSelector(state => state.goal)
	
	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		
		if(!user){
			navigate('/login')
		}else{
			dispatch(getGoals())
		}
		
		return () => {
			dispatch(reset())
		}
	}, [navigate, user, message, isError, dispatch])
	
	if (isLoading){
		return <Spinner />
	}
	
	return (
		<>
			<section className="heading">
				<h1>Welcome {user && user.name}</h1>
				<p>Goals DashBoard</p>
			</section>
			
			<GoalForm />
			
			<div className="content">
				{goals.length > 0 ? (
					<div className='goals'>
						{goals.map(goal => (
							<GoalItem key={goal._id} goal={goal}/>
						))}
					</div>
				) : (<h3>You have not set any goals</h3>)}
			</div>
		</>
	);
}

export default Dashboard;