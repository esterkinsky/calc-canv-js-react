import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Icons from '../../components/svg/Icons'
import useScrollY from '../../hooks/useScrollY';
import './Up.css';

const Up = () => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight });
	}, [y, controls]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	return (
		<motion.div
			animate={controls}
			initial={{ opacity: 0 }}
		>
			<label>
				<button className='upm' onClick={scrollToTop}>Наверх</button>
			<Icons 
					name='arrow'
					color='var(--gray)'
			/>
			</label>
		</motion.div>
	);
};

export default Up;