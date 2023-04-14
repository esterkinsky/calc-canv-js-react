import React from 'react';
import { Point, Light, Math3D, Cube, Sphere } from '../../modules/graph3D';
import Canvas from '../../modules/graph2D/Canvas';
import UI3D from './UI3D';
import styles from './Graph3D.module.css'

export class Graph3DComponent extends React.Component {
	constructor(options) {
		super(options)

		this.width = 1000;
		this.height = 700;
		this.prop = this.width / this.height;

		this.WIN = {
			LEFT: -10 * this.prop,
			BOTTOM: -10,
			WIDTH: 20 * this.prop,
			HEIGHT: 20,
			CAMERA: new Point(0, 0, 50),
			DISPLAY: new Point(0, 0, 30)
		}

		this.math3D = new Math3D({
			WIN: this.WIN
		});

		this.LIGHT = new Light(-30, 0, 0, 20000);

		this.isPointsAllow = true;
		this.isEdgesAllow = true;
		this.isPolysAllow = true;
		this.isAnimationAllow = false;
		this.isShadow = false;

		this.figures = [new Sphere()];
		this.canMove = false;

		this.dx = 0;
		this.dy = 0;
	}

	componentDidMount() {
		this.canvas = new Canvas({
			id: 'canvas3D',
			WIN: this.WIN,
			width: this.width,
			height: this.height,
			callbacks: {
				wheel: event => this.wheel(event),
				mouseMove: event => this.mouseMove(event),
				mouseDown: event => this.mouseDown(event),
				mouseUp: () => this.mouseUp(),
				mouseLeave: () => this.mouseLeave()
			}
		});

		let FPS = 0;
		this.FPS = 0;
		let lastTimestamp = Date.now();

		this.figureAnimantion();
		this.renderScene();

		const animLoop = () => {
			FPS++;
			const timestamp = Date.now();
			if (timestamp - lastTimestamp >= 1000) {
				this.FPS = FPS;
				FPS = 0;
				lastTimestamp = timestamp;
			}
			this.renderScene();
			window.requestAnimationFrame(animLoop);
		}
		animLoop();
	}

	componentWillUnmount() {
		window.cancelAnimationFrame(this.request);
		this.canvas = null;
	}

	figureAnimantion() {
		const gradus = -Math.PI / 170;
		setInterval(() => {
			if (this.isAnimationAllow) {
				const matrix = this.math3D.rotateOx(gradus);
				this.figures.forEach(figure => {
					if (figure) {
						figure.points.forEach(point => {
							this.math3D.transform(matrix, point);
						});
					}
				});
			}
		}, 30)
	}

	addFigure(figure, num) {
		this.figures[num] = eval(`(new Figure).${figure}()`)
		/* switch (figure) {
			case 'cube':
				this.figures[num] = (new Figure).cube();
				break;

			case 'sphere':
				this.figures[num] = (new Figure).sphere();
				break;

			case 'ellipsoid':
				this.figures[num] = (new Figure).ellipsoid();
				break;

			case 'cylinder':
				this.figures[num] = (new Figure).cylinder();
				break;

			case 'parabolicCylinder':
				this.figures[num] = (new Figure).parabolicCylinder();
				break;

			case 'hyperbolicCylinder':
				this.figures[num] = (new Figure).hyperbolicCylinder();
				break;

			case 'cone':
				this.figures[num] = (new Figure).cone();
				break;

			case 'ellipticParaboloid':
				this.figures[num] = (new Figure).ellipticParaboloid();
				break;

			case 'hyperbolicParaboloid':
				this.figures[num] = (new Figure).hyperbolicParaboloid();
				break;

			default:
				break;
		} */
	}

	delFigure(num) {
		this.figures[num] = null;
	}

	check(name) {
		this[name] = !this[name];
	}

	powerOfLight() {
		this.LIGHT.lumen = document.getElementById('powerOfLight').value;
	}

	selectColor() {
		this.figures.forEach(figure => {
			if (figure) {
				figure.polygons.forEach(polygon => {
					polygon.color = polygon.hexToRgb(document.getElementById('colorSelector').value);
				});
			}
		});
	}

	wheel(event) {
		event.preventDefault();
		const delta = (event.wheelDeltaY > 0) ? 1.1 : 0.9;
		const matrix = this.math3D.zoom(delta);
		this.figures.forEach(figure => {
			if (figure) {
				figure.points.forEach(point => {
					this.math3D.transform(matrix, point)
				});
			}
		});
	}

	moveFigures(dx, dy, dz) {
		const matrix = this.math3D.move(dx, dy, dz);
		this.figures.forEach((figure) => {
			if (figure) {
				figure.points.forEach(point => {
					this.math3D.transform(matrix, point);
				});
			}
		});
	}

	mouseMove(event) {
		if (this.canMove) {
			const gradus = Math.PI / 180;
			const matrixY = this.math3D.rotateOy((this.dy - event.offsetY) * gradus);
			const matrixX = this.math3D.rotateOx((this.dx - event.offsetX) * gradus);
			this.figures.forEach(figure => {
				if (figure) {
					figure.points.forEach(point => {
						this.math3D.transform(matrixY, point);
						this.math3D.transform(matrixX, point);
					});
				}
			});
			this.dx = event.offsetX;
			this.dy = event.offsetY;
		}
	}

	mouseDown(event) {
		this.canMove = true;
		this.dx = event.offsetX
		this.dy = event.offsetY
	}

	mouseLeave() {
		this.canMove = false;
	}

	mouseUp() {
		this.canMove = false;
	}

	renderScene() {
		this.canvas.clear();

		if (this.isPolysAllow) {
			const polygons = [];
			this.figures.forEach((figure, figureIndex) => {
				if (figure) {
					this.math3D.calcCenters(figure);
					this.math3D.normVector(figure);
					this.math3D.calcRadius(figure);
					this.math3D.calcDistance(figure, this.WIN.CAMERA, 'distance');
					this.math3D.calcDistance(figure, this.LIGHT, 'lumen');

					figure.polygons.forEach(polygon => {
						polygon.figureIndex = figureIndex;
						polygons.push(polygon);
					})
				};
			});

			this.math3D.sortByArtistAlgoritm(polygons);

			polygons.forEach((polygon) => {
				const points = [];

				for (let i = 0; i < polygon.points.length; i++) {
					points.push(this.figures[polygon.figureIndex].points[polygon.points[i]]);
				}

				/* const { isShadow, dark } = this.math3D.calcShadow(polygon, this.figures, this.LIGHT); */
				const lumen = this.math3D.calcIlluminationDistance(polygon.lumen, this.LIGHT.lumen /* * (isShadow ? dark : 1) */);
				var { r, g, b } = polygon.color;
				r = Math.round(r * lumen);
				g = Math.round(g * lumen);
				b = Math.round(b * lumen);
				this.canvas.polygon(points.map(point => {
					return {
						x: this.math3D.xs(point),
						y: this.math3D.ys(point)
					}
				}), polygon.rgbToColor(r, g, b));
			})
		}

		if (this.isEdgesAllow) {
			this.figures.forEach(figure => {
				if (figure) {
					figure.edges.forEach(edge => {
						const point1 = figure.points[edge.p1];
						const point2 = figure.points[edge.p2];
						this.canvas.line(
							this.math3D.xs(point1),
							this.math3D.ys(point1),
							this.math3D.xs(point2),
							this.math3D.ys(point2),
							1, 'grey'
						);
					});
				};
			});
		}

		if (this.isPointsAllow) {
			this.figures.forEach(figure => {
				if (figure) {
					figure.points.forEach(point => {
						this.canvas.point(this.math3D.xs(point), this.math3D.ys(point), 'grey');
					});
				}
			});
		}
		this.canvas.renderCanvas();
	}

	render() {
		return <>
			<div className="canvas3D">
				<UI3D
					check={(name) => this.check(name)}
					addFigure={(figure, num) => this.addFigure(figure, num)}
				/>
				<canvas id="canvas3D"></canvas>
			</div>
			
		</>
	}

}








{/* 	<div>
				<p>.<br></br>
┋╱╲┋┋┋┊╱▔▔▔▔▔▏<br></br>
╱┉▍╲┋┋╱┉┉┉┉╱▔<br></br>
▔╲┉┉╲╱┉┉┉┉╱<br></br>
┋┋▏┉┉┉┉┉┉╱┋╱▔▔▔▏<br></br>
┋┋▏┉┉┉┉┉┉╲╱┉┉┉┉▏<br></br>
&nbsp; ┋┋╲┉ⓅⒺⒶⒸⒺ┉┉┉┉┉╱<br></br>
┋┋┋╲▂▂▂▂▂▂╱▔▔▔</p>
Эстерчик, спокойной ночи!1! *цмок*
<p></p> 

				</div> */}