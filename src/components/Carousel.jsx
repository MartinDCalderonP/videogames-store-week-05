import React, { useEffect, useState } from 'react';
import styles from '../styles/Carousel.module.scss';
import API_KEY from '../Keys';
import useFetch from '../hooks/useFetch';
import { uppercaseTitle } from './Helpers';
import Spinner from './Spinner';
import Chevron from './Chevron';

export default function Carousel({ toDetail }) {
  const fetchUrl = `https://api.rawg.io/api/games?&dates=2021-01-01,2021-10-01&page_size=3&ordering=-metacritic&key=${API_KEY}`;
  const { data, loading } = useFetch(fetchUrl);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let interval;

    if (data?.results.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide((current) => (current === data?.results.length - 1 ? 0 : current + 1));
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [data?.results.length]);

  const handleCarouselItemClick = (postId) => {
    toDetail(postId);
  };

  const handlePreviousClick = () => {
    setCurrentSlide((current) => (current === 0 ? data?.results.length - 1 : current - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((current) => (current === data?.results.length - 1 ? 0 : current + 1));
  };

  const handleDotClick = (carouselStep) => {
    setCurrentSlide(carouselStep);
  };

  return (
    <>
      {loading && <Spinner />}

      {!loading && data && (
      <div className={styles.carousel}>
        <Chevron
          className={styles.previous}
          onClick={handlePreviousClick}
          orientation="left"
        />

        <div
          className={`${styles.carouselItem} ${styles.fade}`}
          onClick={() => handleCarouselItemClick(data?.results[currentSlide].id)}
        >
          <h1>{uppercaseTitle(data?.results[currentSlide].name)}</h1>

          <div className={styles.triangle} />
          <h2>Top Rated </h2>

          <img
            src={data?.results[currentSlide].background_image}
            alt={uppercaseTitle(data?.results[currentSlide].name)}
          />
        </div>

        <Chevron
          className={styles.next}
          onClick={handleNextClick}
          orientation="right"
        />

        <div className={styles.dotsContainer}>
          {data?.results.map((item, i) => (
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
