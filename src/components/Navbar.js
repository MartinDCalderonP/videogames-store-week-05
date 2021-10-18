import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faSignInAlt,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

export default function Navbar({ toHome, onLoggedUser, user }) {
	const [openModal, setOpenModal] = useState(false);

	const handleHomeClick = () => {
		toHome('home');
	};

	const handleSignInClick = () => {
		setOpenModal(true);
	};

	const handleSignOutClick = () => {
		onLoggedUser(null);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleLoggedUser = (loggedUser) => {
		onLoggedUser(loggedUser);
		setOpenModal(false);
	};

	return (
		<>
			<nav className={styles.navbar}>
				<div onClick={handleHomeClick}>
					<FontAwesomeIcon className={styles.home} icon={faHome} />
					Home
				</div>

				{!user ? (
					<div onClick={handleSignInClick}>
						Sign In
						<FontAwesomeIcon className={styles.signIn} icon={faSignInAlt} />
					</div>
				) : (
					<div onClick={handleSignOutClick}>
						{user?.user?.firstName}
						<FontAwesomeIcon className={styles.signIn} icon={faUserCircle} />
					</div>
				)}
			</nav>

			{openModal && !user && (
				<Modal closeModal={handleCloseModal} loggedUser={handleLoggedUser} />
			)}
		</>
	);
}
