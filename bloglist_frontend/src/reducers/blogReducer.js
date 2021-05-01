import blogService from '../services/blogs';

export const createBlog = (content) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(content);
		dispatch({
			type: 'NEW_BLOG',
			data: newBlog,
		});
	};
};

export const addLike = (blog) => {
	return async (dispatch) => {
		const likedBlog = await blogService.update({
			...blog,
			likes: blog.likes + 1,
		});
		console.log(blog);
		console.log(likedBlog);
		dispatch({
			type: 'ADD_LIKE',
			payload: { ...likedBlog, user: blog.user },
		});
	};
};

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();

		dispatch({
			type: 'INIT_BLOGS',
			data: blogs,
		});
	};
};

export const deleteBlog = (blog) => {
	return async (dispatch) => {
		await blogService.remove(blog.id);

		dispatch({
			type: 'DELETE_BLOG',
			deletedBlog: blog,
		});
	};
};

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'NEW_BLOG': {
			return state.concat(action.data);
		}
		case 'INIT_BLOGS':
			return action.data;
		case 'ADD_LIKE': {
			const likedBlog = action.payload;
			return state.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog));
		}
		case 'DELETE_BLOG': {
			const { deletedBlog } = action;
			return state.filter((blog) => blog.id !== deletedBlog.id);
		}
		default:
			return state;
	}
};

export default reducer;
