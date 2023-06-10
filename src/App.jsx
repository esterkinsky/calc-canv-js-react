import React, { useState } from 'react';
import Menu from './layout/Menu/Menu';
import { Graph2D, Graph3D, Calculators } from './components';

const App = () => {

	const [showComponent, setshowComponent] = useState('canvas3dContent');

	return <>
		<div className='menu'></div>
		<Menu showComponent={setshowComponent} />
		{showComponent === 'canvasContent' ?
			<Graph2D /> :
			showComponent === 'canvas3dContent' ?
				<Graph3D /> :
				showComponent === 'calculatorContent' ?
					<Calculators />
					:
					<>default</>}

	</>
};

export default App;