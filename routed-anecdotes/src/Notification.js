import React from 'react';

export const Notification = ({ msg }) => {
	const style = {
		height: '20px',
		border: '2px solid black',
	};
	if (msg) {
		return <div style={style}>{msg}</div>;
	}
	return null;
};
