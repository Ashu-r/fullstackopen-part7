import userService from '../services/users';

export const getUsersAndInfo = () => {
	return async (dispatch) => {
		const userData = await userService.getAll();
		console.log(userData);
		dispatch({
			type: 'getAll',
			payload: userData,
		});
	};
};

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'getAll':
			return action.payload;

		default:
			return state;
	}
};

export default reducer;
