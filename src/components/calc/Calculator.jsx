import { useRef } from 'react';
import useCalc from '../../hooks/useCalc'
import './Caclulator.css';

const Calculator = () => {

	const refA = useRef(null);
	const refB = useRef(null);
	const refRes = useRef(null);

	const calc = useCalc(refA, refB, refRes);

	const clear = () => {
		refA.current.value = ''
		refB.current.value = ''
		refRes.current.value = ''
	}

	return <>
		<div className='calcsContainer'>
			<section>
				<div className='containerC'>
					<textarea ref={refA} placeholder="0" className='number'></textarea>
					<textarea ref={refB} placeholder="0" className='number' ></textarea>
					<textarea ref={refRes} className='resultNumber' id="resultNumber"></textarea>
					<div className='buttons'>
						<button onClick={() => clear()} id="clear" className='clear'>C</button>
						<button onClick={() => calc('add')} className='operands'> + </button>
						<button onClick={() => calc('sub')} className='operands' > - </button>
						<button onClick={() => calc('mult')} className='operands' > * </button>
						<button onClick={() => calc('div')} className='operands' > / </button>
						<button onClick={() => calc('pow')} className='operands' >x^y</button>
					</div>
				</div>
			</section>
		</div>
	</>
}

export default Calculator;