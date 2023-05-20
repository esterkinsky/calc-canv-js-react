import './PolyOperandBlock.css';

const PolyOperandBlock = ({ operandButtons, onClick }) => {
	return (
		<div className='buttons-calc'>
			{operandButtons.map((button, index) => {
				return (
					<div key={index}
						onClick={() => onClick(button.operand)}
						>{button.text}</div>
				)
			})}
		</div>
	)
}

export default PolyOperandBlock;