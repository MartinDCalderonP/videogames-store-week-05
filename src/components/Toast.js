import React, { useState, useEffect } from 'react';
import styles from '../styles/Toast.module.scss';
import CloseIcon from './CloseIcon';

export default function Toast({ children }) {
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (children) {
			setMessage(children);
		}

		let interval = setInterval(() => {
			setMessage('');
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, [children, setMessage]);

	const handleCloseIconClick = () => {
		setMessage('');
	};

	return (
		<>
			{message && (
				<div className={`${styles.toast} ${styles.appearToast}`}>
					{children}

					<CloseIcon
						className={styles.closeIcon}
						onClick={handleCloseIconClick}
					/>
				</div>
			)}
		</>
	);
}
