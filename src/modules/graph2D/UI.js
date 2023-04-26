import { useState } from "react";

const UI = ({
	changeColor,
	changeWidth,
	changeA,
	changeB,
	switchDerivativeCheckBox,
	switchIntegralCheckBox,
	switchZerosCheckBox,
	addFunction,
	delFunction,
	createObjectFunc
}) => {

	const [num, setNum] = useState(0);

	const addFunctionHandler = () => {
		const inputFunc = createInput(keyUpFunctionHandler, 'f(x)', 'inputFunc');
		const inputWidth = createInput(keyUpWidthHandler, 'Width', 'inputWidth', 'number');
		const inputColor = createInput(keyUpColorHandler, 'Color', 'inputColor', 'color');
		const inputA = createInput(keyUpAHandler, 'a', 'inputA', 'number');
		const inputB = createInput(keyUpBHandler, 'b', 'inputB', 'number');

		const button = document.createElement('button');
		button.innerHTML = '&#10006';
		button.dataset.num = num;
		button.addEventListener('click', () => {
			div.removeChild(funcBlock);
			delFunction(button.dataset.num);
		})
		button.className = 'deleteFunc';

		const checkDerivative = document.createElement('div');
		checkDerivative.dataset.num = num;
		checkDerivative.className = 'switch-btn';
		checkDerivative.addEventListener('click', (event) => switchDerivativeHandler(event))

		const checkIntegral = document.createElement('div');
		checkIntegral.dataset.num = num;
		checkIntegral.className = 'switch-btn';
		checkIntegral.addEventListener('click', (event) => switchIntegralHandler(event))

		const checkZeros = document.createElement('div');
		checkZeros.dataset.num = num;
		checkZeros.className = 'switch-btn';
		checkZeros.addEventListener('click', (event) => switchZerosHandler(event))

		const funcBlock = document.createElement('div');
		funcBlock.className = 'funcBlock';

		funcBlock.appendChild(inputFunc);
		funcBlock.appendChild(inputWidth);
		funcBlock.appendChild(inputA);
		funcBlock.appendChild(inputB);
		funcBlock.appendChild(inputColor);
		funcBlock.appendChild(checkZeros);
		funcBlock.appendChild(checkDerivative);
		funcBlock.appendChild(checkIntegral);
		funcBlock.appendChild(button);

		const div = document.querySelector('.funcsContainer');

		div.appendChild(funcBlock);

		createObjectFunc(num);
		setNum(num + 1);
	}

	const createInput = (handler, placeholder, className, type = 'text') => {
		const input = document.createElement('input');
		input.dataset.num = num;
		input.addEventListener('input', (event) => handler(event));
		input.setAttribute('placeholder', placeholder);
		input.setAttribute('type', type);
		input.className = className;
		return input;
	}

	const keyUpFunctionHandler = (event) => {
		try {
			let f;
			eval(`f = function(x) {return ${event.target.value};}`);
			addFunction(event.target.dataset.num, f);
		} catch (e) {
			console.log(e);
		}
	}

	const keyUpWidthHandler = (event) => {
		changeWidth(event.target.dataset.num, event.target.value);
	}

	const keyUpColorHandler = (event) => {
		changeColor(event.target.dataset.num, event.target.value);
	}

	const keyUpAHandler = (event) => {
		changeA(event.target.dataset.num, event.target.value);
	}

	const keyUpBHandler = (event) => {
		changeB(event.target.dataset.num, event.target.value);
	}

	const switchDerivativeHandler = (event) => {
		event.target.classList.toggle('switch-on');
		switchDerivativeCheckBox(event.target.dataset.num);
	}

	const switchIntegralHandler = (event) => {
		event.target.classList.toggle('switch-on');
		switchIntegralCheckBox(event.target.dataset.num);
	}

	const switchZerosHandler = (event) => {
		event.target.classList.toggle('switch-on');
		switchZerosCheckBox(event.target.dataset.num);
	}
}

export default UI;