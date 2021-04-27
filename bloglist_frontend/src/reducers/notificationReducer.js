let timeoutID;
export const newNotification = (message) => {
	return (dispatch) => {
		clearTimeout(timeoutID);
		dispatch({
			type: 'new',
			message,
		});
		timeoutID = setTimeout(() => {
			dispatch({
				type: 'new',
				message: '',
			});
		}, 5000);
	};
};

const reducer = (state = '', action) => {
	switch (action.type) {
		case 'new': {
			return action.message;
		}
		default:
			return state;
	}
};

export default reducer;
