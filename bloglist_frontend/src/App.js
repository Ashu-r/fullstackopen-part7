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
import 'antd/dist/antd.css';
import { Layout, Menu, PageHeader, List, Divider, Button, Breadcrumb, Pagination } from 'antd';
const { Header, Content, Footer } = Layout;
import './App.css';

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

	const Blogs = () => {
		return blogs
			.sort((a, b) => b.likes - a.likes)
			.map((blog) => (
				<div style={blogStyle} key={blog.id}>
					<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
				</div>
			));
	};

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
			<Layout className='layout'>
				<Router>
					<Header>
						{user === null ? (
							<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['home']}>
								<Menu.Item key='home'>
									<Link style={padding} to='/'>
										Home
									</Link>
								</Menu.Item>

								<Menu.Item key='users'>
									<Link style={padding} to='/users'>
										Users
									</Link>
								</Menu.Item>
							</Menu>
						) : (
							<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['home']}>
								<Menu.Item key='home'>
									<Link style={padding} to='/'>
										Home
									</Link>
								</Menu.Item>

								<Menu.Item key='users'>
									<Link style={padding} to='/users'>
										Users
									</Link>
								</Menu.Item>

								<span className='loggedIn'>{user.name} logged-in </span>
								<Menu.Item
									danger='true'
									key='logout'
									onClick={() => {
										dispatch(logout());
										window.localStorage.removeItem('loggedUser');
									}}
								>
									Log Out
								</Menu.Item>
							</Menu>
						)}
					</Header>

					<Content
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						}}
					>
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
								<PageHeader
									className='site-page-header'
									title='Blogs'
									footer={[
										user ? (
											<Togglable buttonLabel='New blog' ref={blogFormRef}>
												<NewBlogForm setErrorMessage={setErrorMessage} blogFormRef={blogFormRef} />
											</Togglable>
										) : (
											<Togglable buttonLabel='login'>
												<Login />
											</Togglable>
										),
									]}
								/>
								,{/* <Blogs /> */}
								<List
									itemLayout='horizontal'
									dataSource={blogs.sort((a, b) => b.likes - a.likes)}
									renderItem={(blog) => (
										<div>
											<List.Item style={{ backgroundColor: '#87e8de', paddingLeft: '1.4rem' }}>
												<List.Item.Meta title={<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>} />
											</List.Item>
											<Divider />
										</div>
									)}
								/>
							</Route>
						</Switch>
					</Content>
					<Pagination hideOnSinglePage='true' defaultCurrent={1} total={50} />
				</Router>
			</Layout>
		</div>
	);
};

export default App;
