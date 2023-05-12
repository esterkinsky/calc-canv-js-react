import { useRef } from 'react';
import usePolyCalc from '../../hooks/usePolyCalc';
import usePolyResult from '../../hooks/usePolyResult';
import PolyCalcInput from './input/PolyCalcInput';
import NewPoly from './newPoly/NewPoly';
import PolyOperandBlock from './operands/PolyOperandBlock';
import PolyResult from './input/PolyCalcInput';

const Poly = () => {

	const refInputA = useRef(null);
	const refInputB = useRef(null);
	const refNewPoly = useRef(null);
	const refResult = useRef(null);
	const refInputX = useRef(null);

	const polyCalc = usePolyCalc(refInputA, refInputB, refNewPoly);
	const polyResult = usePolyResult(refNewPoly, refInputX, refResult);

	const operandButtons = [
		{
			operand: 'add',
			text: 'a + b',
		},
		{
			operand: 'sub',
			text: 'a - b',
		},
		{
			operand: 'mult',
			text: 'a * b',
		},
	]

	return (
		<div className='calcsContainer'>
			<div className='containerC'>
				<PolyCalcInput
					inputA={refInputA}
					inputB={refInputB}
				/>
				<NewPoly
					newPoly={refNewPoly}
				/>
				<PolyOperandBlock
					operandButtons={operandButtons}
					onClick={polyCalc}
				/>
				<PolyResult
					onClick={polyResult}
					inputX={refInputX}
					result={refResult}
				/>
			</div>
		</div>
	);
}

export default Poly;