import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = {
		display: visible ? 'none' : '',
		paddingLeft: '10px',
	};
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		};
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button type='primary' onClick={toggleVisibility}>
					{props.buttonLabel}
				</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button type='primary' onClick={toggleVisibility}>
					{props.cancelLabel || 'cancel'}
				</Button>
			</div>
		</div>
	);
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
