import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, addLike, deleteBlog, addComment } from '../reducers/blogReducer';
import { useParams, useHistory } from 'react-router-dom';

const Blog = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.user);
	const id = useParams().id;
	useEffect(() => {
		dispatch(initializeBlogs());
		console.log('dispatched');
	}, []);
	const blog = useSelector((state) => state.blogs).find((blog) => blog.id === id);
	const blogAuthor = useSelector((state) => state.users);
	console.log(blog);
	console.log(blogAuthor);
	if (!blog) {
		return null;
	}

	const Comment = () => {
		const [comment, setComment] = useState('');
		const blogComment = blog.comments;
		const handleComment = async (event) => {
			console.log(blogComment);
			event.preventDefault();
			try {
				dispatch(addComment(blog, comment));
				setComment('');
			} catch (exception) {
				console.log(exception);
			}
		};
		return (
			<div>
				<form onSubmit={handleComment}>
					<input
						placeholder='Add Comment'
						value={comment}
						onChange={({ target }) => {
							setComment(target.value);
						}}
					></input>
					<button type='submit'>Add</button>
				</form>
				<div>
					{blogComment ? (
						<ul>
							{blogComment.map((comment) => (
								<li key={comment}>{comment}</li>
							))}
						</ul>
					) : null}
				</div>
			</div>
		);
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
			history.push('/');
		}
	};
	return (
		<div className='blog'>
			<h2>{blog.title}</h2>
			<div className='bloginfo'>
				<a href={blog.url}>{blog.url}</a>
				<p className='likes'>
					{blog.likes} likes
					<button onClick={() => dispatch(addLike(blog))}>like</button>
				</p>
				<p>
					Added by {blog.author} ({blog.user.username})
				</p>
				<DeleteBtn />
			</div>
			<Comment />
		</div>
	);
};

export default Blog;
