import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
	const errorMessage = useSelector((state) => state.notification);
	if (!errorMessage) {
		return null;
	}
	const notificationStyle = {
		backgroundColor: '#bbebed',
		padding: '10px',
	};
	return <div style={notificationStyle}>{errorMessage}</div>;
};

export default Notification;
