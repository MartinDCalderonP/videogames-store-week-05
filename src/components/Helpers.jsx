export const uppercaseTitle = (title) => {
  const words = title.toLowerCase().split(' ');

  for (let i = 0; i < words.length; i++) {
    if (words[i] === '3d' || words[i] === 'vii') {
      words[i] = words[i].toUpperCase();
    } else {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
  }

  return words.join(' ');
};

export const getNamesFromArray = (array) => array?.map((item) => item.name).join(', ');
