import React, { useState, useRef } from 'react';
import styles from '../styles/Comments.module.scss';
import useFetch from '../hooks/useFetch';
import { formatDate } from './Helpers';
import Spinner from './Spinner';
import Button from './Button';

export default function Comments({ postId }) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games/${postId}/comments`;
	const { data, loading, fetchData } = useFetch(fetchUrl);
	const [textAreaValue, setTextAreaValue] = useState(undefined);
	const textAreaRef = useRef();

	const handleTextAreaValueChange = (e) => {
		setTextAreaValue(e.target.value);
	};

	const handlePostCommentButtonClick = (e) => {
		e.preventDefault();

		textAreaRef.current.focus();

		// if (commentAreaValue) {
		// 	let newComment = {};

		// 	newComment['comment'] = commentAreaValue;
		// 	newComment['postId'] = postId;

		// 	postComments(newComment);
		// }
	};

	// const postComments = async (commentObject) => {
	// 	try {
	// 		const response = await fetch(fetchUrl, {
	// 			method: 'POST',
	// 			body: JSON.stringify(commentObject),
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		});

	// 		const result = await response.json();

	// 		if (result) {
	// 			fetchData();
	// 		}
	// 	} catch (err) {
	// 		alert(`${err}. Try again later.`);
	// 	}
	// };

	return (
		<>
			<div className={styles.commentBox}>
				<textarea
					className={styles.commentArea}
					value={textAreaValue}
					onChange={handleTextAreaValueChange}
					ref={textAreaRef}
					type="text"
					name="commentArea"
					placeholder="Leave a comment..."
					rows="5"
				/>

				<Button onClick={handlePostCommentButtonClick}>Comentar</Button>
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
