export default function createListMarkup(dataArray, createItemMarkup) {
  if (!Array.isArray(dataArray) || !dataArray.length > 0)
    return 'Нажаль данні не завантажились( Спробуйте пізніше'; // TODO - add notification
  return dataArray.map(data => createItemMarkup(data)).join('');
}