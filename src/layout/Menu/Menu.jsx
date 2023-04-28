import React from 'react';
import styles from './Menu.module.css'

const Menu = ({ showComponent }) => {
	return <>
		<div className={styles.menu}>
			<button className={styles.menuitem} onClick={() => { showComponent('RPGContent') }}
			>RPG</button>
			<button className={styles.menuitem} onClick={() => { showComponent('calculatorContent') }}
			>Calculator</button>
			<button className={styles.menuitem} onClick={() => { showComponent('polinomialContent') }}
			>Poli Calculator</button>
			<button className={styles.menuitem} onClick={() => { showComponent('canvasContent') }}
			>Graph2d</button>
			<button className={styles.menuitem} onClick={() => { showComponent('canvas3dContent') }}
			>Graph3d</button>

		</div>
	</>
};

export default Menu;