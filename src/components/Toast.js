import React, { useEffect } from 'react';
import styles from '../styles/Toast.module.scss';
import CloseIcon from './CloseIcon';

export default function Toast({ closeToast, children }) {
	useEffect(() => {
		let interval = setInterval(() => {
			closeToast(true);
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, [closeToast]);

	const handleCloseIconClick = () => {
		closeToast(true);
	};

	return (
		<div className={`${styles.toast} ${styles.appearToast}`}>
			{children}

			<CloseIcon className={styles.closeIcon} onClick={handleCloseIconClick} />
		</div>
	);
}
