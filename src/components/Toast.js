import React from 'react';
import styles from '../styles/Toast.module.scss';
import CloseIcon from './CloseIcon';

export default function Toast({ children }) {
	return (
		<div className={styles.toast}>
			{children}

			<CloseIcon />
		</div>
	);
}
