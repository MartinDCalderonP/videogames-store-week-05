import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Navbar.module.scss';

export default function Navbar({ toHome }) {
  const handleHomeClick = () => {
    toHome('home');
  };

  return (
    <nav className={styles.navbar}>
      <div onClick={handleHomeClick}>
        <FontAwesomeIcon icon={faHome} />
        Home
      </div>
    </nav>
  );
}
