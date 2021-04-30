import React, { useState } from 'react';
import { login } from '../reducers/loginReducer';
import { newNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			dispatch(
				login({
					username,
					password,
				})
			);

			setUsername('');
			setPassword('');
		} catch (exception) {
			console.log(exception);
			dispatch(newNotification('Wrong credentials'));
			setTimeout(() => {
				dispatch(newNotification(null));
			}, 5000);
		}
	};
	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input id='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
			</div>
			<div>
				password
				<input id='password' type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
			</div>
			<button id='login-button' type='submit'>
				login
			</button>
		</form>
	);
};

export default Login;
