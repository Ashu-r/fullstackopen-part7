import React from 'react';
import { useField } from './hooks';

export const CreateNew = (props) => {
	const { reset: resetContent, ...content } = useField('content');
	const { reset: resetAuthor, ...author } = useField('author');
	const { reset: resetInfo, ...info } = useField('info');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(content, author, info);
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
	};

	const handleReset = () => {
		resetAuthor();
		resetInfo();
		resetContent();
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button type='submit'>Create</button>
			</form>
			<button onClick={handleReset}>Reset</button>
		</div>
	);
};
