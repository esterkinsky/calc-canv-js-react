class Poly {
	constructor(options) {
		super(options)
	}

	addEventListeners() {
		document.querySelectorAll('.polyOperand')
			.forEach(button =>
				button.addEventListener('click', (event) =>
					this.operandHandler(event)));

		document.querySelector('.resultButton')
			.addEventListener('click', () =>
				this.resultHandler())
	}

	operandHandler(event) {
		const inputA = document.querySelector('.polyInputA');
		const inputB = document.querySelector('.polyInputB');
		const calc = new PolynomialCalculator;
		const a = calc.getPolynomial(inputA.value);
		const b = calc.getPolynomial(inputB.value);
		const operand = event.target.dataset.operand;
		const c = calc[operand](a, b);
		document.querySelector('.newPoly').innerHTML = c.toString();
	}

	resultHandler() {
		const calc = new PolynomialCalculator;
		const inputX = document.querySelector('.polyInputX');
		const x = (new Calculator).getEntity(inputX.value);
		const c = calc.getPolynomial(document.querySelector('.newPoly').value);
		document.querySelector('.polyResult').innerHTML = (c.getValue(x)).toString();
	}

}


/* 
<div class="calcsContainer">
	    <section>
	        <div class="containerC">
                <textarea class="polyInputA" placeholder="Полином"></textarea>
                <textarea class="polyInputB" placeholder="Полином"></textarea>
                <textarea class="polyInputX" placeholder="x"></textarea>
                <div class="resultContainer">
                    <textarea class="newPoly" placeholder= "Result" ></textarea>
                </div>
                <div class="resultContainer">
                    <textarea class="polyResult"></textarea>
		        </div>
                <div class="buttons">
                    <button class="polyOperand" data-operand="add">+</button>
                    <button class="polyOperand" data-operand="sub">-</button>
                    <button class="polyOperand" data-operand="mult">*</button>
                    <button class="resultButton">=</button>
                </div>
            </div>
        </section>
	</div>
	 */