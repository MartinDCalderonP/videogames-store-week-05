import React from 'react';
import styles from '../styles/PaginationButtons.module.scss';
import useFetch from '../hooks/useFetch';

export default function PaginationButtons({ postsPerPage, paginate }) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games/count`;
	const { data, loading } = useFetch(fetchUrl);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(data / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className={styles.buttonsContainer}>
			{!loading &&
				pageNumbers?.map((pageNumber) => (
					<button
						className={styles.pageButton}
						key={`paginationButton${pageNumber}`}
						onClick={() => paginate(pageNumber)}
					>
						{pageNumber}
					</button>
				))}
		</div>
	);
}
