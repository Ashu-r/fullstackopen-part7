import React, { useEffect } from 'react';
import { getUsersAndInfo } from '../reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
	const id = useParams().id;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsersAndInfo());
	}, []);
	const user = useSelector((state) => state.users).find((user) => user.id === id);

	if (!user) {
		return null;
	}
	return (
		<div>
			<h3>{user.name}</h3>

			{user.blogs ? (
				<div>
					<h4>Added blogs</h4>
					<ul>
						{user.blogs.map((blog) => (
							<li key={blog.id}>{blog.title}</li>
						))}
					</ul>
				</div>
			) : (
				<p>No blogs written by {user.name}</p>
			)}
		</div>
	);
};

export default User;
