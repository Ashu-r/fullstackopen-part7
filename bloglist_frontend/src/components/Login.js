import React, { useState } from 'react';
import { login } from '../reducers/loginReducer';
import { newNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleLogin = async () => {
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
		<Form onFinish={handleLogin}>
			<Form.Item
				label='Username'
				name='username'
				rules={[
					{
						required: true,
						message: 'Please input your username!',
					},
				]}
			>
				<Input value={username} id='username' name='username' onChange={({ target }) => setUsername(target.value)} />
			</Form.Item>
			<Form.Item
				label='Password'
				name='password'
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
			>
				<Input.Password value={password} id='password' name='password' onChange={({ target }) => setPassword(target.value)} />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Login;
