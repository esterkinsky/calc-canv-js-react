import './NewPoly.css';

const NewPoly = ({ newPoly }) => {
	return (
		<>
			<textarea
				className='number'
				placeholder="Новый полином"
				ref={newPoly}
			></textarea>
		</>
	)
}

export default NewPoly;