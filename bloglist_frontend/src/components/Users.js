import React, { useEffect } from 'react';
import { getUsersAndInfo } from '../reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsersAndInfo());
	}, []);
	const users = useSelector((state) => state.users);
	console.log(users);
	return (
		<div>
			<h3>Users</h3>
			<table>
				<thead>
					<tr>
						<th>User</th>
						<th>
							<strong>Blogs Created</strong>
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
