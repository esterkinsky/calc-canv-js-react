import Calculator from '../modules/calc/Calculator';

const useCalc = (refA, refB, refRes) => {
	const calc = new Calculator();
	return (operand) => {
		if (refA && refB && refRes) {
			const A = refA.current.value;
			const B = refB.current.value;
			refRes.current.value = calc[operand](calc.getEntity(A), calc.getEntity(B)).toString();
		};
	};
};

export default useCalc;