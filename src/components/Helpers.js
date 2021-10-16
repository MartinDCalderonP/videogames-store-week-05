export const formatDate = (dateString) => {
	const insertedDate = new Date(dateString);
	const nowDate = Date.now();
	const diffTime = Math.abs(nowDate - insertedDate);
	const diffMinutes = Math.ceil(diffTime / (1000 * 60));
	const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

	return diffMinutes < 61
		? `${diffMinutes} minutes ago`
		: diffHours < 25
		? `${diffHours} hours ago`
		: diffDays < 32
		? `${diffDays} days ago`
		: `${diffMonths} months ago`;
};

export const getNamesFromArray = (array) => {
	return array?.map((item) => item.name).join(', ');
};

export const setPagesNumbers = (total, postsPerPage) => {
	let pageNumbers = [];

	for (let i = 1; i <= Math.ceil(total / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return pageNumbers;
};
