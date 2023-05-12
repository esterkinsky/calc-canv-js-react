import {Calculator, Poly }from '../../components';
import Up from '../../layout/Up/Up';
import './Calculator.css'

const Calculators = () => {
	return (
		<>
			<div className='calcgrid'>
				<div className='c'><Calculator /></div>
				<div className='ci'>
					<div className='dropbtnci'>Ввод матриц, векторов и комплексных чисел</div>
					<div className="dropdowncontentci">
						<a>calc inf</a>
					</div>
				</div>
				<div className='pc'><Poly /></div>
				<div className='pci'>
					<div className='dropbtnpci'>Ввод многочленов</div>
					<div className="dropdowncontentpci">
						<a>poly inf</a>
					</div>
				</div>
				<div className='up'><Up /></div>
			</div></>
	)
}

/* <div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div> */


export default Calculators;