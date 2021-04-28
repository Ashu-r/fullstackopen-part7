import React from 'react';

export const Anecdote = ({ anecdote }) => {
	console.log(anecdote);
	return (
		<div>
			<h2>{anecdote.content}</h2>
			<div>{anecdote.info}</div>
			<div>
				<strong>{anecdote.votes} votes</strong>
			</div>
			<div>-{anecdote.author}</div>
		</div>
	);
};
