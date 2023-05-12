import React from 'react';
import IconsSVG from './icons.svg';

function Icons({ name, color, className }) {

	return (
		<svg className={`icon icon-${name} ${className}`} fill={color} >
			<use xlinkHref={`${IconsSVG}#icon-${name}`} />
		</svg>
	)
}

export default Icons;