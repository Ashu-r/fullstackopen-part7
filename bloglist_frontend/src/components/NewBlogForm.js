import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

const NewBlogForm = ({ blogFormRef }) => {
	const [title, settitle] = useState('');
	const [author, setauthor] = useState('');
	const [url, seturl] = useState('');
	const dispatch = useDispatch();

	const addNewBlog = async (event) => {
		event.preventDefault();
		try {
			blogFormRef.current.toggleVisibility();
			dispatch(
				createBlog({
					title,
					author,
					url,
				})
			);
			settitle('');
			setauthor('');
			seturl('');
			dispatch(newNotification(`New Blog: ${title} by ${author}`));
			setTimeout(() => {
				dispatch(newNotification(null));
			}, 5000);
		} catch (exception) {
			console.log(exception);
			dispatch(newNotification('Please provide all fields'));
			setTimeout(() => {
				dispatch(newNotification(null));
			}, 5000);
		}
	};

	return (
		<div>
			<h2>Create New Blog</h2>
			<form onSubmit={addNewBlog}>
				<div>
					Title:
					<input
						value={title}
						onChange={({ target }) => {
							settitle(target.value);
						}}
						name='title'
					></input>
				</div>{' '}
				<br />
				<div>
					Author:
					<input
						value={author}
						onChange={({ target }) => {
							setauthor(target.value);
						}}
						name='title'
					></input>
				</div>{' '}
				<br />
				<div>
					Url:
					<input
						value={url}
						onChange={({ target }) => {
							seturl(target.value);
						}}
						name='title'
					></input>
				</div>{' '}
				<br />
				<button type='submit'>Add</button>
			</form>
		</div>
	);
};

export default NewBlogForm;
