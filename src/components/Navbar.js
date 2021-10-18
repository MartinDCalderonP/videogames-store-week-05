import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faSignInAlt,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

export default function Navbar({ toHome }) {
	const [user, setUser] = useState('');
	const [openModal, setOpenModal] = useState(false);

	const handleHomeClick = () => {
		toHome('home');
	};

	const handleSignInClick = () => {
		setOpenModal(true);
	};

	const handleSignOutClick = () => {
		setUser('');
	};

	const onCloseModal = () => {
		setOpenModal(false);
	};

	const onLoggedUser = (loggedUser) => {
		setOpenModal(false);
		setUser(loggedUser);
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

			{openModal && (
				<Modal closeModal={onCloseModal} loggedUser={onLoggedUser} />
			)}
		</>
	);
}
