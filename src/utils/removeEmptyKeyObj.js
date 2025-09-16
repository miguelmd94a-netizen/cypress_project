function clean(obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName];
    }
  }
  return obj;
}
const filterValues = (arr) => {
  const items = [];

  for (const item of arr) {
    const obj = clean(item);

    items.push(obj);
  }

  return items;
};

export default filterValues;
