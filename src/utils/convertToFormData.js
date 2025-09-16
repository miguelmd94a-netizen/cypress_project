export default async (img) => {
  const res = await fetch(img);
  const blob = await res.blob();
  const dataImg = new FormData();

  dataImg.append('file', blob, img.name);
  return dataImg;
};
