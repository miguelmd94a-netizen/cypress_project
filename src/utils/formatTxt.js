const formatTxt = (str, n) => {
  if (!str) {
    return '';
  }
  if (str.length > n) {
    return `${str.slice(0, n)}...`;
  }
  return str;
};

export default formatTxt;
