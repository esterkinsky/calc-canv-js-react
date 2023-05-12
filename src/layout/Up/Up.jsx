import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import useScrollY from '../../hooks/useScrollY';
import './Up.module.css';

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
			className='up'
			animate={controls}
			initial={{ opacity: 0 }}
		>
			<button onClick={scrollToTop}>Наверх</button>
		</motion.div>
	);
};

export default Up;