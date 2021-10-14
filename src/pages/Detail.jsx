import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Detail.module.scss';
import API_KEY from '../Keys';
import useFetch from '../hooks/useFetch';
import { getNamesFromArray } from '../components/Helpers';
import Spinner from '../components/Spinner';
import Chevron from '../components/Chevron';
import RatingStars from '../components/RatingStars';
import MinimumRequirements from '../components/MinimumRequirements';
import PlatformIcons from '../components/PlatformIcons';
import ESRB from '../components/ESRB';
import Comments from '../components/Comments';

export default function Detail({ postId }) {
  const fetchUrl = `https://api.rawg.io/api/games/${postId}?key=${API_KEY}`;
  const { data, loading } = useFetch(fetchUrl);
  const [expandedText, setExpandedText] = useState(false);

  const handleExpandText = () => {
    setExpandedText(!expandedText);
  };

  return (
    <div className={styles.container}>
      {loading && <Spinner />}

      {!loading && data && (
      <>
        <h1>{data.name}</h1>

        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <div className={styles.image}>
              <img src={data.background_image} alt={data.name} />
            </div>

            <div
              className={`${styles.description} ${
								  !expandedText ? '' : styles.active
              }`}
            >
              <p>{data.description_raw}</p>

              <Chevron
                className={styles.expandText}
                onClick={handleExpandText}
                orientation={!expandedText ? 'down' : 'top'}
              />
            </div>
          </div>

          <div className={styles.dividerColumn} />

          <div className={styles.rightColumn}>
            <RatingStars rating={data.rating} top={data.rating_top} />

            <div className={styles.information}>
              <h3>Game Details</h3>

              <p>
                <b>Title: </b>
                {data.name_original}
              </p>

              <p>
                <b>Genre: </b>
                {getNamesFromArray(data.genres)}
              </p>

              <p>
                <b>Developer: </b>
                {getNamesFromArray(data.developers)}
              </p>

              {data?.publishers.length > 0 && (
              <p>
                <b>Publisher: </b>
                {getNamesFromArray(data.publishers)}
              </p>
              )}

              <MinimumRequirements platforms={data.platforms} />

              <PlatformIcons platforms={data.parent_platforms} />

              <ESRB rating={data.esrb_rating} />

              <a href={data.website}>
                Official website
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            </div>
          </div>
        </div>

        <Comments postId={data.id} />
      </>
      )}
    </div>
  );
}
