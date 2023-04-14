import React from "react";
import styles from './Graph3D.module.css';

export default class UI3D extends React.Component {
	constructor(props) {
		super(props);

		this.num = 0;
		this.check = props.check;
		this.addFigure = props.addFigure;
		this.selectColor = props.selectColor;
		/* this.LIGHT.lumen = props.LIGHT.lumen;
		this.powerOfLight = props.powerOfLight;*/
		this.state = { showPanel: false, showAddList: false }
	}

	showHidePanel() {
		this.setState({ showPanel: !this.state.showPanel });
	}

	showHideAddList() {
		this.setState({ showAddList: !this.state.showAddList });
	}

	addFigureHandler(event) {
		this.addFigure(event.target.dataset.figure, this.num);
		this.num++;
	}

	render() {
		return <>
			<div className="UI3D">
				{this.state.showPanel && <div className={styles.figuresMenu}>
					<div className={styles.allows}>
						<div class="colorSelector">
							<input id="colorSelector" type="color" defaultValue="#ff88c1" onClick={() => this.selectColor()} />
						</div>
						<label>
							<input type="checkbox" id="isPoints" className="Options3D" defaultChecked onClick={() => this.check('isPointsAllow')} />
							<span className="checkingButtonStyle">Points</span>
						</label>
						<label>
							<input type="checkbox" id="isEdges" className="Options3D" defaultChecked onClick={() => this.check('isEdgesAllow')} />
							<span className="checkingButtonStyle">Edges</span>
						</label>
						<label>
							<input type="checkbox" id="isPoly" className="Options3D" defaultChecked onClick={() => this.check('isPolysAllow')} />
							<span className="checkingButtonStyle">Polygons</span>
						</label>
						<label>
							<input type="checkbox" id="isAnimation" className="Options3D" onClick={() => this.check('isAnimationAllow')} />
							<span className="checkingButtonStyle">Animation</span>
						</label>
						<label>
							<input type="checkbox" id="isShadow" className="Options3D" onClick={() => this.check('isShadow')} />
							<span className="checkingButtonStyle">Shadows</span>
						</label>
						{/* <div className="powerOfLight">
							<input id="powerOfLight" type="range" min="5000" defaultValue={this.LIGHT.lumen} max="50000" step="1000" onInput={() => this.powerOfLight()} />
						</div> */}
					</div>
				</div>}
				<button onClick={() => this.showHidePanel()} className={styles.addFigureBtn}>

				</button>
			</div >
		</>
	}
}