import React from 'react';
import { Menu } from './layout/Menu/Menu';
import { Graph2DComponent } from './components/graph2D/Graph2DComponent';
import { Graph3DComponent } from './components/graph3D/Graph3DComponent';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showComponent: 'canvas3dContent' };
	}

	showComponent(name) {
		this.setState({ showComponent: name })
	}

	render() {
		return <>
			<div className='menu'>
				<Menu showComponent={name => this.showComponent(name)} />
				{this.state.showComponent === 'canvasContent' ?
					<Graph2DComponent /> :
					this.state.showComponent === 'canvas3dContent' ?
						<Graph3DComponent /> :
						<>default</>}
			</div>
		</>
	};
}

export default App;