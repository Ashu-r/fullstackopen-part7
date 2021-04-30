import loginService from '../services/login';

export const login = (userAuth) => {
	return async (dispatch) => {
		const user = await loginService.login(userAuth);
		dispatch({
			type: 'LOGIN',
			payload: user,
		});
	};
};

export const autoLogin = (user) => ({
	type: 'AUTOLOGIN',
	payload: user,
});

export const logout = () => ({
	type: 'LOGOUT',
});

const reducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGIN': {
			return action.payload;
		}
		case 'LOGOUT':
			return null;
		case 'AUTOLOGIN':
			return action.payload;
		default:
			return state;
	}
};

export default reducer;
