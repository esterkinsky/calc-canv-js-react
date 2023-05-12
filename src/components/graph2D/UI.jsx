import { useState, useCallback } from "react";
import Function from '../../modules/graph2D/Function';
import Icons from '../svg/Icons';
import FunctionList from './functionList/FunctionList';
import '../graph2D/Graph2D.css';

const UI = ({ funcsList, delFunc }) => {

	const [showPanel, setShowPanel] = useState(false);
	const [functionsCount, setFunctionsCount] = useState(0);
	const [deleteFunction, setDeleteFunction] = useState(0);

	const showHidePanelHandler = useCallback((event) => {
		event.target.classList.toggle(`${'down'}`);
		setShowPanel(!showPanel);
	}, [setShowPanel, showPanel]);

	const addFunction = useCallback(() => {
		funcsList[functionsCount] = new Function({ index: functionsCount });
		setFunctionsCount(functionsCount + 1);
	}, [setFunctionsCount, functionsCount, funcsList])

	const deleteFunctionHandler = useCallback((index) => {
		delFunc(index);
		setDeleteFunction(deleteFunction + 1);
	}, [delFunc, setDeleteFunction, deleteFunction]);


	return (
		<div className='graph2DUI'>
			{showPanel && <div className='funcsMenu'>
				<button className='addFunction' onClick={addFunction}>Добавить функцию</button>
				<FunctionList
					list={funcsList.filter(func => func)}
					delFunc={deleteFunctionHandler}
				/>
			</div>
			}
			<label>
				<div onClick={showHidePanelHandler}>
					<Icons
						name='arrow'
						color='var(--gray)'
						className='funcsListBtn'
					/></div></label >
		</div>
	)
}

export default UI;