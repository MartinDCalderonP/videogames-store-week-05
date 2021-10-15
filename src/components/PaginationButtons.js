import React, { useState } from 'react';
import styles from '../styles/PaginationButtons.module.scss';
import useFetch from '../hooks/useFetch';

export default function PaginationButtons({ postsPerPage, paginate }) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games/count`;
	const { data, loading } = useFetch(fetchUrl);
	const [currentPage, setCurrentPage] = useState(1);
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(data / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	const handlePageButtonClick = (pageNumber) => {
		paginate(pageNumber);
		setCurrentPage(pageNumber);
	};

	return (
		<div className={styles.buttonsContainer}>
			{!loading &&
				pageNumbers?.map((pageNumber) => (
					<button
						className={
							styles.pageButton +
							(currentPage === pageNumber ? ` ${styles.active}` : '')
						}
						key={`paginationButton${pageNumber}`}
						onClick={() => handlePageButtonClick(pageNumber)}
					>
						{pageNumber}
					</button>
				))}
		</div>
	);
}
