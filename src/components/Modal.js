import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import CloseIcon from './CloseIcon';
import Button from './Button';
import Toast from './Toast';

export default function Modal({ closeModal }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/auth/local`;
	const [openToast, setOpenToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

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

		let formData = {
			identifier: username,
			password: password,
		};

		try {
			const response = await fetch(fetchUrl, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();

			if (result.statusCode === 400) {
				setToastMessage(result.message[0].messages[0].message);
			} else {
				setToastMessage(
					`Welcome ${result.user.firstName} ${result.user.lastName}!`
				);
			}
		} catch (err) {
			setToastMessage(`${err}. Try again later.`);
		}

		setOpenToast(true);
	};

	const onCloseToast = () => {
		setOpenToast(false);
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

			{openToast && <Toast closeToast={onCloseToast}>{toastMessage}</Toast>}
		</div>,
		document.getElementById('portal')
	);
}
