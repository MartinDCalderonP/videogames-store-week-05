import React from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import CloseIcon from './CloseIcon';
import Button from './Button';

export default function Modal({ closeModal }) {
	const handleCloseIconClick = () => {
		closeModal(true);
	};

	return createPortal(
		<div className={`${styles.overlay} ${styles.showModal}`}>
			<div className={styles.modal}>
				<CloseIcon
					className={styles.modalClose}
					onClick={handleCloseIconClick}
				/>

				<h1>Sign In</h1>

				<form className={styles.signInForm}>
					<input
						value={username}
						onChange={handleUsernameChange}
						type="text"
						placeholder="Username"
					/>

					<input
						value={password}
						onChange={handlePasswordChange}
						type="text"
						placeholder="Password"
					/>

					<Button onClick={handleSignInButton}>Sign In</Button>
				</form>
			</div>
		</div>,
		document.getElementById('portal')
	);
}
