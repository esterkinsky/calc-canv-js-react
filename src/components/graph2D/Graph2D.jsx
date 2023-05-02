import { useEffect } from 'react';
import useCanvas from '../../hooks/useCanvas';
import UI from './UI';

const Graph2D = () => {
	const height = window.innerHeight-100;
	const width = window.innerWidth-20;
	const prop = width / height;
	const WIN = {
		LEFT: -10 * prop,
		BOTTOM: -10,
		WIDTH: 20 * prop,
		HEIGHT: 20,
	}
	let canMove = false;
	let zoomStep = 1;
	const funcs = [];
	let mousePosX = 0;
	let mousePosY = 0;
	let canvas = null;

	const Canvas = useCanvas(() => renderGraph());

	useEffect(() => {
		canvas = Canvas({
			id: 'graph',
			WIN: WIN,
			width: width,
			height: height,
			callbacks: {
				wheel,
				mouseUp,
				mouseDown,
				mouseMove,
				mouseLeave,
			}
		});

		return () => {
			canvas = null;
		}
	})

	const printOXY = () => {
		canvas.line(0, WIN.BOTTOM, 0, WIN.HEIGHT + WIN.BOTTOM, 2, '#787d85')
		canvas.line(WIN.LEFT, 0, WIN.WIDTH + WIN.LEFT, 0, 2, '#787d85')

		canvas.line(WIN.WIDTH + WIN.LEFT, 0, WIN.WIDTH + WIN.LEFT - 0.6, 0.20, 2, '#787d85');
		canvas.line(WIN.WIDTH + WIN.LEFT, 0, WIN.WIDTH + WIN.LEFT - 0.6, - 0.20, 2, '#787d85')
		canvas.line(0, WIN.HEIGHT + WIN.BOTTOM, - 0.20, WIN.HEIGHT + WIN.BOTTOM - 0.6, 2, '#787d85')
		canvas.line(0, WIN.HEIGHT + WIN.BOTTOM, 0.20, WIN.HEIGHT + WIN.BOTTOM - 0.6, 2, '#787d85')
	}

	const grid = () => {
		for (var i = 0; i < WIN.HEIGHT + WIN.BOTTOM; i++) {
			canvas.line(WIN.LEFT, i, WIN.WIDTH + WIN.LEFT, i, 1, '#d7d7d7')
			canvas.line(0.1, i, -0.1, i, '#A4A4A4')
		}
		for (var j = 0; j > WIN.BOTTOM; j--) {
			canvas.line(WIN.LEFT, j, WIN.WIDTH + WIN.LEFT, j, 1, '#d7d7d7')
			canvas.line(0.1, j, -0.1, j, '#787d85')
		}
		for (var k = 0; k < WIN.WIDTH + WIN.LEFT; k++) {
			canvas.line(k, WIN.BOTTOM, k, WIN.HEIGHT + WIN.BOTTOM, 1, '#d7d7d7')
			canvas.line(k, 0.1, k, -0.1, '#787d85')
		}
		for (var l = 0; l > WIN.LEFT; l--) {
			canvas.line(l, WIN.BOTTOM, l, WIN.HEIGHT + WIN.BOTTOM, 1, '#d7d7d7')
			canvas.line(l, 0.1, l, -0.1, 1, '#787d85')
		}
	}

	const printNums = () => {
		const shiftY = -WIN.HEIGHT * 0.01 - 0.04;
		const shiftX = WIN.WIDTH * 0.001 + 0.04;
		for (let i = Math.round(WIN.LEFT); i < WIN.LEFT + WIN.WIDTH; i++) {
			canvas.printText(i, i + shiftX, shiftY,);
		}
		for (let i = Math.round(WIN.BOTTOM); i < WIN.BOTTOM + WIN.HEIGHT; i++) {
			canvas.printText(i, shiftX, i + shiftY,);
		}
	}

	const wheel = (event) => {
		event.preventDefault()
		const delta = (event.wheelDelta > 0) ? -zoomStep : zoomStep;
		if (WIN.WIDTH + delta * prop > 0 && WIN.HEIGHT + delta > 0) {
			WIN.WIDTH += prop * delta;
			WIN.HEIGHT += delta;
			WIN.LEFT -= prop * delta / 2;
			WIN.BOTTOM -= delta / 2;
		}
	}

	const mouseUp = () => {
		canMove = false;
	}

	const mouseDown = () => {
		canMove = true;
	}

	const mouseMove = (event) => {
		if (canMove) {
			WIN.LEFT -= canvas.sx(event.movementX);
			WIN.BOTTOM -= canvas.sy(event.movementY);
		}
		mousePosY = WIN.BOTTOM + canvas.sy(event.offsetY);
		mousePosX = WIN.LEFT + canvas.sx(event.offsetX);
	}

	const mouseLeave = () => {
		canMove = false;
	}

	const printFunction = (f, color = 'black', linewidth = 2) => {
		const { WIDTH, LEFT, HEIGHT } = WIN;
		const dx = WIDTH / 1000;
		let x = LEFT;

		while (x < WIDTH + LEFT) {
			const y1 = f(x);
			const y2 = f(x + dx);
			if (Math.abs(y1 - y2) < HEIGHT) {
				canvas.line(x, f(x), x + dx, f(x + dx), linewidth, color);
			}
			else {
				canvas.line(x, f(x), x + dx, f(x + dx), linewidth, color, true);
			}
			x += dx;
		}
	}

	const getDerivative = (f, x0, dx = 0.00001) => {
		return (f(x0 + dx) - f(x0)) / dx;
	}

	const printDerivative = (f, x) => {
		const k = getDerivative(f, x)
		let b = f(x) - k * x;
		let x1 = WIN.LEFT;
		let x2 = WIN.LEFT + WIN.WIDTH;
		let y1 = k * x1 + b;
		let y2 = k * x2 + b;
		canvas.line(x1, y1, x2, y2, 1, '#7417b3', true);
	}

	const getIntegral = (f, a, b, d = 100) => {
		const dx = (b - a) / d;
		let x = a;
		const points = [{ x, y: 0, }]
		while (x <= b) {
			points.push({ x, y: f(x) });
			x += dx
		}
		points.push({ x, y: f(x) })
		points.push({ x, y: 0 });
		canvas.polygon(points);
	}

	const getZero = (f, a, b, eps = 0.0001) => {
		if (f(a) * f(b) > 0) return null;
		if (f(a) === 0) return a;
		if (f(b) === 0) return b;
		if (Math.abs(f(b) - f(a)) <= eps) return (a + b) / 2;
		const half = (a + b) / 2;
		if (f(a) * f(half) <= 0) return getZero(f, a, half, eps)
		if (f(b) * f(half) <= 0) return getZero(f, half, b, eps)
		else return null;
	}

	const printZeros = ({ f, color = '#7417b3', x, dx }) => {
		if (f(x) * f(x + dx) <= 0) {
			canvas.point({ x: x + dx / 2, y: 0, color })
		}
	}

	const renderGraph = () => {
		if (canvas) {
			canvas.clear()
			grid();
			printNums();
			printOXY();
			funcs.forEach(func => {
				if (func) {
					const { f, color, width, a, b, showDerivative, showIntegral, showZeros } = func;
					if (f) {
						printFunction(f, color, width);
						if (showDerivative) {
							printDerivative(f, mousePosX);
						}
						if ((a || b) && a !== b) {
							if (showIntegral) {
								if (a > b) {
									getIntegral(f, b, a);
								} else {
									getIntegral(f, a, b);
								}
							}
							if (showZeros) {
								if (a > b) {
									canvas.point(getZero(f, a, b), 0);
								} else {
									canvas.point(getZero(f, a, b), 0);
								}
							}
						}
					}
				}
			});
			canvas.renderCanvas();
		}
	}

	const changeWidth = (num, width) => {
		funcs[num].width = width;
	}

	const changeColor = (num, color) => {
		funcs[num].color = color;
	}

	const addFunction = (num, f) => {
		funcs[num].f = f;
	}

	const changeA = (num, value) => {
		funcs[num].a = value - 0;
	}

	const changeB = (num, value) => {
		funcs[num].b = value - 0;
	}

	const switchDerivativeCheckBox = (num) => {
		funcs[num].showDerivative = !funcs[num].showDerivative;
	}

	const switchIntegralCheckBox = (num) => {
		funcs[num].showIntegral = !funcs[num].showIntegral;
	}

	const switchZerosCheckBox = (num) => {
		funcs[num].showZeros = !funcs[num].showZeros;
	}

	const delFunction = (num) => {
		funcs[num] = null;
	}

	const createObjectFunc = (num) => {
		funcs[num] = {
			f: null,
			color: 'black',
			WIDTH: 2,
			a: 0,
			b: 0,
		}
	}
	return (
		<div>
			<UI
				changeWidth={(num, width) => changeWidth(num, width)}
				changeColor={(num, color) => changeColor(num, color)}
				addFunction={(num, f) => addFunction(num, f)}
				changeA={(num, value) => changeA(num, value)}
				changeB={(num, value) => changeB(num, value)}
				switchDerivativeCheckBox={(num) => switchDerivativeCheckBox(num)}
				switchIntegralCheckBox={(num) => switchIntegralCheckBox(num)}
				switchZerosCheckBox={(num) => switchZerosCheckBox(num)}
				delFunction={(num) => delFunction(num)}
				createObjectFunc={(num) => createObjectFunc(num)}
			/>
			<canvas id="graph"></canvas>
		</div>
	)
}


export default Graph2D;