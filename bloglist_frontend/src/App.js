import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/Login';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';
import { initializeBlogs } from './reducers/blogReducer';
import { autoLogin, logout } from './reducers/userReducer';

const App = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const [errorMessage, setErrorMessage] = useState(null);

	const blogFormRef = useRef();
	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);
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
			<h2>blogs</h2>
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => (
					<Blog key={blog.id} blog={blog} user={user} />
				))}
		</div>
	);
};

export default App;
