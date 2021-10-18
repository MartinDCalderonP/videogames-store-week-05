import React from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

export default function Modal({ closeModal }) {
	const handleCloseIconClick = () => {
		closeModal(true);
	};

	return createPortal(
		<div className={`${styles.overlay} ${styles.showModal}`}>
			<div className={styles.modal}>
				<FontAwesomeIcon icon={faTimes} onClick={handleCloseIconClick} />
				<h1>Sign In</h1>

				<input type="text" placeholder="Email"></input>
				<input type="text" placeholder="Password"></input>

				<Button className={styles.signInButton}>Sign In</Button>
			</div>
		</div>,
		document.getElementById('portal')
	);
}
