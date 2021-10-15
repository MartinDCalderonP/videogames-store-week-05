import React, { useState } from 'react';
import styles from '../styles/Comments.module.scss';
import useFetch from '../hooks/useFetch';
import { formatDate } from './Helpers';
import Spinner from './Spinner';

export default function Comments({ postId }) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games/${postId}/comments`;
	const { data, loading, fetchData } = useFetch(fetchUrl);
	const [commentAreaValue, setCommentAreaValue] = useState(undefined);

	const handleCommentAreaValueChange = (e) => {
		setCommentAreaValue(e.target.value);
	};

	const handleCommentButtonClick = (e) => {
		e.preventDefault();

		if (commentAreaValue) {
			let newComment = {};

			newComment['comment'] = commentAreaValue;
			newComment['postId'] = postId;

			postComments(newComment);
		}
	};

	const postComments = async (commentObject) => {
		try {
			const response = await fetch(fetchUrl, {
				method: 'POST',
				body: JSON.stringify(commentObject),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();

			if (result) {
				fetchData();
			}
		} catch (err) {
			console.log(`${err}. Try again later.`);
		}
	};

	return (
		<>
			<div className={styles.commentBox}>
				<textarea
					className={styles.commentArea}
					type="text"
					name="commentArea"
					placeholder="Leave a comment..."
					rows="5"
					onChange={handleCommentAreaValueChange}
				/>

				<button
					className={styles.commentButton}
					onClick={handleCommentButtonClick}
				>
					Comentar
				</button>
			</div>

			<div className={styles.divider} />

			<div className={styles.commentsContainer}>
				<h3>Comments:</h3>

				{loading && <Spinner />}

				{!loading &&
					data?.length > 0 &&
					data
						?.map((item) => (
							<div key={`comment${item.id}`}>
								<p>
									{`${item.user.firstName} ${item.user.lastName} `}
									<span>{formatDate(item.created_at)}</span>
								</p>
								<p>{item.body}</p>
							</div>
						))
						.reverse()}

				{!loading && data?.length === 0 && (
					<h3>There are no comments yet. Be the first!</h3>
				)}
			</div>
		</>
	);
}
