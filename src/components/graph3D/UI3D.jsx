import React, { useCallback, useState } from "react";
import styles from './Graph3D.module.css';

const UI3D = ({
	check,
	addFigure,
	delFigure,
	selectColor,
	LIGHT,
	show,
	powerOfLight,
}) => {

	const [num, setNum] = useState(0);

	const [showPanel, setShowPanel] = useState(false);
	const [showAddList, setShowAddList] = useState(false);

	const showHidePanelHandler = useCallback(() => {
		setShowPanel(!showPanel);
	}, [setShowPanel, showPanel]);

	const showHideAddListHandler = useCallback(() => {
		setShowAddList(!showAddList);
	}, [setShowAddList, showAddList]);

	const addFigureHandler = (event) => {
		const figure = event.target.dataset.figure;
		addFigure(figure, num);

		document.querySelector('.figuresContainer').appendChild(createSettings(figure));
		showHideAddListHandler();
		setNum(num + 1);
	};

	const createSettings = () => {
		const settingsBlock = document.createElement('div');
		settingsBlock.dataset.num = num;

		const button = document.createElement('div');
		button.innerHTML = '&#10006';
		button.dataset.num = num;
		button.addEventListener('click', () => {
			document.querySelector('.figuresContainer').removeChild(settingsBlock);
			delFigure(button.dataset.num);
		});
		button.className = 'deleteFunc';
		settingsBlock.appendChild(button);
		return settingsBlock;
	}

	return <>
		{showPanel && <div className={styles.figuresMenu}>
			<div className={styles.allows}>
				<div className="colorSelector">
					<input id="colorSelector" type="color" defaultValue="#ff88c1" onClick={() => selectColor()} />
				</div>
				<label>
					<input type="checkbox" id="isPoints" className="Options3D" defaultChecked={show.isPointsAllow} onClick={() => check('isPointsAllow')} />
					<span className="checkingButtonStyle">Points</span>
				</label>
				<label>
					<input type="checkbox" id="isEdges" className="Options3D" defaultChecked={show.isEdgesAllow} onClick={() => check('isEdgesAllow')} />
					<span className="checkingButtonStyle">Edges</span>
				</label>
				<label>
					<input type="checkbox" id="isPoly" className="Options3D" defaultChecked={show.isPolysAllow} onClick={() => check('isPolysAllow')} />
					<span className="checkingButtonStyle">Polygons</span>
				</label>
				<label>
					<input type="checkbox" id="isAnimation" className="Options3D" defaultChecked={show.isAnimationAllow} onClick={() => check('isAnimationAllow')} />
					<span className="checkingButtonStyle">Animation</span>
				</label>
				<label>
					<input type="checkbox" id="isShadow" className="Options3D" defaultChecked={show.isShadow} onClick={() => check('isShadow')} />
					<span className="checkingButtonStyle">Shadows</span>
				</label>
				<div className="powerOfLight">
					<input id="powerOfLight" type="range" min="5000" defaultValue={LIGHT.lumen} max="50000" step="1000" onInput={() => powerOfLight()} />
				</div>
			</div>
			<div className="add-button">
				{showAddList ? <div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="Cube">Куб</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="Sphere" >Сфера</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="Cone" >Конус</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="Ellipsoid" >Эллипсоид</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="Cylinder" >Цилиндр</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="EllipticParaboloid">Эллиптический параболоид</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="HyperbolicCylinder">Гиперболический цилиндр</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="HyperbolicParaboloid">Гиперболический параболоид</div>
					<div onClick={(event) => addFigureHandler(event)} data-figure="ParabolicCylinder">Эллиптический цилиндр</div>
				</div> :
					<button onClick={showHideAddListHandler} className={styles.addFig}>Добавить</button>
				}
				<div className="figuresContainer"></div>
			</div>
		</div>}
		<button onClick={showHidePanelHandler} className={styles.figListBtn}>
		</button>
	</>
};

export default UI3D;