import React, { useEffect, useState } from 'react';
import styles from '../styles/Carousel.module.scss';
import Spinner from './Spinner';
import Chevron from './Chevron';

export default function Carousel({ loading, posts, toDetail }) {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		let interval;

		if (posts?.length > 0) {
			interval = setInterval(() => {
				setCurrentSlide((current) =>
					current === posts?.length - 1 ? 0 : current + 1
				);
			}, 5000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [posts?.length]);

	const handleCarouselItemClick = (postId) => {
		toDetail(postId);
	};

	const handlePreviousClick = () => {
		setCurrentSlide((current) =>
			current === 0 ? posts?.length - 1 : current - 1
		);
	};

	const handleNextClick = () => {
		setCurrentSlide((current) =>
			current === posts?.length - 1 ? 0 : current + 1
		);
	};

	const handleDotClick = (carouselStep) => {
		setCurrentSlide(carouselStep);
	};

	return (
		<>
			{loading && <Spinner />}

			{!loading && posts && (
				<div className={styles.carousel}>
					<Chevron
						className={styles.previous}
						onClick={handlePreviousClick}
						orientation="left"
					/>

					<div
						className={`${styles.carouselItem} ${styles.fade}`}
						onClick={() => handleCarouselItemClick(posts[currentSlide]?.id)}
					>
						<h1>{posts[currentSlide]?.name}</h1>

						<img
							src={posts[currentSlide]?.cover_art?.formats?.large?.url}
							alt={posts[currentSlide]?.name}
						/>
					</div>

					<Chevron
						className={styles.next}
						onClick={handleNextClick}
						orientation="right"
					/>

					<div className={styles.dotsContainer}>
						{posts?.map((item, i) => (
							<span
								className={
									styles.dot + (currentSlide === i ? ` ${styles.active}` : '')
								}
								key={`dot${i}`}
								onClick={() => handleDotClick(i)}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
}
