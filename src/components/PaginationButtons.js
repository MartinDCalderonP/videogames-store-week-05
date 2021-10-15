import React from 'react';
import styles from '../styles/PaginationButtons.module.scss';

export default function PaginationButtons({
	totalPosts,
	postsPerPage,
	paginate,
}) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className={styles.buttonsContainer}>
			{pageNumbers.map((number) => (
				<button className={styles.pageButton} key={number} onClick={() => paginate(number)}>
					{number}
				</button>
			))}
		</div>
	);
}
