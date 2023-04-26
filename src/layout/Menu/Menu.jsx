import React from 'react';
import styles from './Menu.module.css'

const Menu = ({ showComponent }) => {
	return <>
		<div className={styles.menu}>
			<button className={styles.menuitem} onClick={() => { showComponent('RPGContent') }}
			>RPG</button>
			<button className={styles.menuitem} onClick={() => { showComponent('calculator') }}
			>Calculator</button>
			<button className={styles.menuitem} id="canvas-button" onClick={() => { showComponent('canvasContent') }}
			>Graph2d</button>
			<button className={styles.menuitem} id="3d-button" onClick={() => { showComponent('canvas3dContent') }}
			>Graph3d</button>
		</div>
	</>
};

export default Menu;