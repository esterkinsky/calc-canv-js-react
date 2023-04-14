import React from 'react';
import { Graph2D } from '../../modules/graph2D/Graph2D';
import styles from '../graph2D/Graph2D.module.css'

export class Graph2DComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <>
			<canvas id="graph"></canvas>
			<div className={styles.menuGraphButton}></div>
			<div className={styles.container2}>
				<button className={styles.addFunction}>Add f(x)</button>
				<div className={styles.funcsContainer}></div>
			</div>
		</>
	}

	componentDidMount() {
		new Graph2D();
	}
}