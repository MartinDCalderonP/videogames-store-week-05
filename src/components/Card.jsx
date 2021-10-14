import React from 'react';
import styles from '../styles/Card.module.scss';

export default function Card({ name, image, onClick }) {
  return (
    <div className={`${styles.card} ${styles.appearCard}`} onClick={onClick}>
      <p>{name}</p>
      <div className={styles.cardImage}>
        <img src={image} alt={name} />
      </div>
    </div>
  );
}
