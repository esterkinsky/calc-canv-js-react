import './PolyCalcInput.css';

const PolyCalcInput = ({ inputA, inputB }) => {
	return (
		<>
			<textarea
				className='number'
				placeholder="Полином"
				ref={inputA}
			></textarea>
			<textarea
				className='number'
				placeholder="Полином"
				ref={inputB}
			></textarea>
		</>
	)

}

export default PolyCalcInput;