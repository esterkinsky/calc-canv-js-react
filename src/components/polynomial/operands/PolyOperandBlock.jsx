import CalcButton from '../../calc/calcButton/CalcButton';

import './PolyOperandBlock.css';

const PolyOperandBlock = ({ operandButtons, onClick }) => {
	return (
		<>
			{operandButtons.map((button, index) => {
				return (
					<div key={index}>
						<button
							onClick={() => onClick(button.operand)}
							text={button.text}
						/>
					</div>
				)
			})}
		</>
	)
}

export default PolyOperandBlock;