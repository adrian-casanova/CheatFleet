export const formatData = milliseconds => {
  const seconds = Math.round(milliseconds / 1000);
  if (seconds >= 3600) {
    const hours = Math.round(seconds / 3600);
    return `${hours} hours ago`;
  } else if (seconds >= 60) {
    const minutes = Math.round(seconds / 60);
    return `${minutes} minutes ago`;
  }
  return `${seconds} seconds ago`;
};

export const sortData = (data, property) => {
  const sortedData = data.map(item => {
    const newComments = item.comments.sort((a, b) => {
      const propA = a[property];
      const propB = b[property];
      return propA - propB;
    });
    return Object.assign(item, { comments: newComments.reverse() });
  });
  return sortedData;
};
