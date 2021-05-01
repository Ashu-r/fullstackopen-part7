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

	const blogStyle = {
		padding: '15px',
		border: '2px solid #5C6BC0',
		// display:'flex',
		// 'justify-content': 'flex-start'
	};
	const padding = { padding: 5 };

	return (
		<div>
			<Notification errorMessage={errorMessage} />
			<Router>
				{user === null ? (
					<div>
						<Link style={padding} to='/'>
							Home
						</Link>
						<Link style={padding} to='/users'>
							Users
						</Link>

						<Togglable buttonLabel='login'>
							<Login />
						</Togglable>
					</div>
				) : (
					<div>
						<Link style={padding} to='/'>
							Home
						</Link>
						<Link style={padding} to='/users'>
							Users
						</Link>
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
					</div>
				)}

				<Switch>
					<Route path='/blogs/:id'>
						<Blog />
					</Route>
					<Route path='/users/:id'>
						<User />
					</Route>
					<Route path='/users'>
						<Users />
					</Route>
					<Route path='/'>
						{user === null ? null : (
							<Togglable buttonLabel='New blog' ref={blogFormRef}>
								<NewBlogForm setErrorMessage={setErrorMessage} blogFormRef={blogFormRef} />
							</Togglable>
						)}
						<h2>blogs</h2>
						{blogs
							.sort((a, b) => b.likes - a.likes)
							.map((blog) => (
								<div style={blogStyle} key={blog.id}>
									<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
								</div>
							))}
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
