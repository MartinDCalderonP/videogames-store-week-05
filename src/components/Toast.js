import React from 'react';
import styles from '../styles/Toast.module.scss';
import CloseIcon from './CloseIcon';

export default function Toast({ closeToast, children }) {
	const handleCloseIconClick = () => {
		closeToast(true);
	};

	return (
		<div className={styles.toast}>
			{children}

			<CloseIcon className={styles.closeIcon} onClick={handleCloseIconClick} />
		</div>
	);
}
