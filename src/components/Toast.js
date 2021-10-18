import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

	return createPortal(
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
		</>,
		document.getElementById('portal')
	);
}
