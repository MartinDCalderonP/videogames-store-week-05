export const getNamesFromArray = (array) => {
	return array?.map((item) => item.name).join(', ');
};
