import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';
import useFetch from '../hooks/useFetch';
import Carousel from '../components/Carousel';
import CardsContainer from '../components/CardsContainer';
import PaginationButtons from '../components/PaginationButtons';

export default function Home({ toDetail }) {
	const postsUrl = `https://trainee-gamerbox.herokuapp.com/games`;
	const [fetchUrl] = useState(postsUrl);
	const { data, loading } = useFetch(fetchUrl);

	const carouselPosts = data
		?.slice(0, 4)
		.filter((item) => item?.cover_art?.url);
	const cardsContainerPosts = data?.slice(4);

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(8);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = cardsContainerPosts?.slice(
		indexOfFirstPost,
		indexOfLastPost
	);

	const handleToDetail = (postId) => {
		toDetail(postId);
	};

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<Carousel
				loading={loading}
				posts={carouselPosts}
				toDetail={handleToDetail}
			/>

			<div className={styles.mainContainer}>
				<CardsContainer
					loading={loading}
					posts={currentPosts}
					toDetail={handleToDetail}
				/>

				<PaginationButtons
					totalPosts={cardsContainerPosts?.length}
					postsPerPage={postsPerPage}
					paginate={paginate}
				/>
			</div>
		</>
	);
}
