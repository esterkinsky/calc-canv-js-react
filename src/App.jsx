import React, { useState } from 'react';
import Menu from './layout/Menu/Menu';
import { Calculator, Graph2D, Graph3D } from './components';

const App = () => {

	const [showComponent, setshowComponent] = useState('calculatorContent');

	return <>
		<div className='menu'></div>
		<Menu showComponent={setshowComponent} />
		{showComponent === 'canvasContent' ?
			<Graph2D /> :
			showComponent === 'canvas3dContent' ?
				<Graph3D /> :
				showComponent === 'calculatorContent' ?
					<Calculator /> :
					<>default</>}

	</>
};

export default App;