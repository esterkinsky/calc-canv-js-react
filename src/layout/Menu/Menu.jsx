import React from 'react';
import styles from './Menu.module.css'

export class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.showComponent = props.showComponent;
	}

	render() {
		return <>
			<div className={styles.menu}>
				<button className={styles.menuitem} onClick={() => { this.showComponent('RPGContent') }}
				>RPG</button>
				<button className={styles.menuitem} onClick={() => { this.showComponent('calculator') }}
				>Calculator</button>
				<button className={styles.menuitem} id="canvas-button" onClick={() => { this.showComponent('canvasContent') }}
				>Graph2d</button>
				<button className={styles.menuitem} id="3d-button" onClick={() => { this.showComponent('canvas3dContent') }}
				>Graph3d</button>
			</div>
		</>
	}
}