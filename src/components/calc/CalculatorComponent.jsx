import { useRef } from 'react';
import useCalc from '../../hooks/useCalc'
import styles from './Caclulator.module.css';

const CalculatorComponent = () => {

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
		<div className={styles.calcsContainer}>
			<section>
				<div className={styles.containerC}>
					<textarea ref={refA} placeholder="0" className={styles.number}></textarea>
					<textarea ref={refB} placeholder="0" className={styles.number} ></textarea>
					<textarea ref={refRes} className={styles.resultNumber} id="resultNumber"></textarea>
					<div className={styles.buttons}>
						<button onClick={() => clear()} id="clear" className={styles.clear}>C</button>
						<button onClick={() => calc('zero')} className={styles.operands} > zero </button>
						<button onClick={() => calc('one')} className={styles.operands} > one </button>
						<button onClick={() => calc('add')} className={styles.operands}> + </button>
						<button onClick={() => calc('sub')} className={styles.operands} > - </button>
						<button onClick={() => calc('mult')} className={styles.operands} > * </button>
						<button onClick={() => calc('divide')} className={styles.operands} > / </button>
						<button onClick={() => calc('pow')} className={styles.operands} >x^y</button>
					</div>
				</div>
			</section>
		</div>
	</>
}

export default CalculatorComponent;