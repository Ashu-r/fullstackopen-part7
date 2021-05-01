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
			type: 'UPDATE',
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

export const addComment = (blog, comment) => {
	return async (dispatch) => {
		const blogWithCOmment = await blogService.addComment({
			...blog,
			comments: blog.comments.concat(comment),
		});
		console.log(blog);
		console.log(blogWithCOmment);
		dispatch({
			type: 'UPDATE',
			payload: { ...blogWithCOmment, user: blog.user },
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
		case 'UPDATE': {
			const updatedBlog = action.payload;
			return state.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog));
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
