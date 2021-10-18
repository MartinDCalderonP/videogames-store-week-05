import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import useAuth from '../hooks/useAuth';
import CloseIcon from './CloseIcon';
import Button from './Button';
import Toast from './Toast';

export default function Modal({ closeModal, loggedUser }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [formData, setFormData] = useState('');
	const { user, message } = useAuth(formData);

	const handleCloseIconClick = () => {
		closeModal(true);
	};

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSignInButton = async (e) => {
		e.preventDefault();

		setFormData({
			identifier: username,
			password: password,
		});
	};

	if (user) {
		loggedUser(user);
	}

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
						name="Username"
						placeholder="Username"
					/>

					<input
						value={password}
						onChange={handlePasswordChange}
						type="password"
						name="Password"
						placeholder="Password"
					/>

					<Button onClick={handleSignInButton}>Sign In</Button>
				</form>
			</div>

			<Toast>{message}</Toast>
		</div>,
		document.getElementById('portal')
	);
}
