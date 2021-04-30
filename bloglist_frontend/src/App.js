import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/Login';
import Users from './components/Users';
import User from './components/User';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';
import { initializeBlogs } from './reducers/blogReducer';
import { autoLogin, logout } from './reducers/loginReducer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const [errorMessage, setErrorMessage] = useState(null);

	const blogFormRef = useRef();
	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);
	const blogs = useSelector((store) => store.blogs);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(autoLogin(user));
			blogService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		if (user) {
			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			blogService.setToken(user.token);
		}
	}, [user]);

	const padding = { padding: 5 };

	return (
		<div>
			<Notification errorMessage={errorMessage} />
			{user === null ? (
				<Togglable buttonLabel='login'>
					<Login />
				</Togglable>
			) : (
				<div>
					<p>
						{user.name} logged-in{' '}
						<button
							onClick={() => {
								dispatch(logout());
								window.localStorage.removeItem('loggedUser');
							}}
						>
							Log Out
						</button>
					</p>

					<Togglable buttonLabel='New blog' ref={blogFormRef}>
						<NewBlogForm setErrorMessage={setErrorMessage} blogFormRef={blogFormRef} />
					</Togglable>
				</div>
			)}
			<Router>
				<div>
					<Link style={padding} to='/'>
						Home
					</Link>
					<Link style={padding} to='/users'>
						Users
					</Link>
				</div>

				<Switch>
					<Route path='/users/:id'>
						<User />
					</Route>
					<Route path='/users'>
						<Users />
					</Route>
					<Route path='/'>
						<h2>blogs</h2>
						{blogs
							.sort((a, b) => b.likes - a.likes)
							.map((blog) => (
								<Blog key={blog.id} blog={blog} user={user} />
							))}
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
