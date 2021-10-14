import React from 'react';
import styles from '../styles/Card.module.scss';
import gameDefault from '../img/gameDefault.png';

export default function Card({ name, image, onClick }) {
	return (
		<div className={`${styles.card} ${styles.appearCard}`} onClick={onClick}>
			<p>{name}</p>
			<div className={styles.cardImage}>
				<img
					className={!image && styles.defaultImage}
					src={image || gameDefault}
					alt={name}
				/>
			</div>
		</div>
	);
}
