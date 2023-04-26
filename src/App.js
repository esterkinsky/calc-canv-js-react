import React, { useState } from 'react';
import Menu from './layout/menu/Menu';
import Graph2DComponent from './components/graph2D/Graph2DComponent';
import Graph3DComponent from './components/graph3D/Graph3DComponent';

const App = () => {

	const [showComponent, setshowComponent] = useState('canvas3dContent');

	return <>
		<div className='menu'>
			<Menu showComponent={setshowComponent} />
			{showComponent === 'canvasContent' ?
				<Graph2DComponent /> :
				showComponent === 'canvas3dContent' ?
					<Graph3DComponent /> :
					<>default</>}
		</div>
	</>
};

export default App;