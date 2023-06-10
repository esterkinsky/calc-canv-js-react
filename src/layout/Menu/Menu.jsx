import React from 'react';
import './Menu.css'

const Menu = ({ showComponent }) => {
	return <>
		<div className='menu'>
			<button className='menuitem' onClick={() => { showComponent('calculatorContent') }}
			>Calculator</button>
			<button className='menuitem' onClick={() => { showComponent('canvasContent') }}
			>Graph2d</button>
			<button className='menuitem' onClick={() => { showComponent('canvas3dContent') }}
			>Graph3d</button>
		</div>
	</>
};

export default Menu;