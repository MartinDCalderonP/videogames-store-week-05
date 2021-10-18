import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

export default function Navbar({ toHome }) {
	const [openModal, setOpenModal] = useState(false);

	const handleHomeClick = () => {
		toHome('home');
	};

	const handleSignInClick = () => {
		setOpenModal(true);
	};

	const onCloseModal = () => {
		setOpenModal(false);
	};

	return (
		<>
			<nav className={styles.navbar}>
				<div onClick={handleHomeClick}>
					<FontAwesomeIcon className={styles.home} icon={faHome} />
					Home
				</div>

				<div onClick={handleSignInClick}>
					Sign In
					<FontAwesomeIcon className={styles.signIn} icon={faUserCircle} />
				</div>
			</nav>

			{openModal && <Modal closeModal={onCloseModal} />}
		</>
	);
}
