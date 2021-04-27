import React from 'react';
import Togglable from './Togglable';
import { useDispatch } from 'react-redux';
import { addLike, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ user, blog }) => {
	const dispatch = useDispatch();
	const blogStyle = {
		padding: '15px',
		border: '2px solid #5C6BC0',
		// display:'flex',
		// 'justify-content': 'flex-start'
	};

	const btnStyle = {
		backgroundColor: '#f44336',
		color: 'white',
	};

	const DeleteBtn = () => {
		if (user && blog.user.username === user.username) {
			return (
				<button style={btnStyle} onClick={removeBlog}>
					Delete
				</button>
			);
		} else {
			return null;
		}
	};

	const removeBlog = async () => {
		if (window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog));
		}
	};
	return (
		<div style={blogStyle} className='blog'>
			{blog.title} {blog.author}
			<Togglable buttonLabel='view' cancelLabel='hide'>
				<div className='bloginfo'>
					<p>{blog.url}</p>
					<p className='likes'>
						{blog.likes} likes
						<button onClick={() => dispatch(addLike(blog))}>like</button>
					</p>
					<p>{blog.user.username}</p>
					<DeleteBtn />
				</div>
			</Togglable>
		</div>
	);
};

export default Blog;
