import { useState, useEffect } from 'react';

const useFetch = (fetchUrl) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);

		fetch(fetchUrl)
			.then((res) => res.json())
			.then((result) => {
				setData(result);
				setLoading(false);
			})
			.catch((err) => console.log(`${err}. Try again later.`));
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			fetch(fetchUrl)
				.then((res) => res.json())
				.then((result) => {
					setData(result);
					setLoading(false);
				})
				.catch((err) => console.log(`${err}. Try again later.`));
		};

		fetchData();
	}, [fetchUrl]);

	return { data, loading, fetchData };
};

export default useFetch;
