function convertToCSV(objArray) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  for (let i = 0; i < array.length; i++) {
    let line = ``;
    for (const index in array[i]) {
      if (line != '') line += ',';

      line += array[i][index].includes(',')
        ? `"${array[i][index]}"`
        : array[i][index];
    }
    str += `${line}\r\n`;
  }

  return str;
}

export const exportCSVFile = (headers, items, fileTitle) => {
  if (headers) {
    items.unshift(headers);
  }
  // Convert Object to JSON
  const jsonObject = JSON.stringify(items);

  const csv = convertToCSV(jsonObject);

  const exportedFilenmae = `${fileTitle}.csv` || 'export.csv';

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    const link = document.getElementById('downloadLink');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilenmae);
    }
  }
};
