import refs from '../../common/js/refs';
import paginationBtnMarkup from '../../templates/paginationBtnMarkup';
import { addClass, removeClass } from '../../common/js/toggleClass';

export function getCurrentPage(e) {
  if (!e) return "1";
  
  let currentPage = "1";
  if (e.target.dataset.page === 'next') {
    currentPage = String(Number(refs.pagination.dataset.currentpage) + 1);
  } else if (e.target.dataset.page === 'prev') {
    currentPage = String(Number(refs.pagination.dataset.currentpage) - 1);
  } else currentPage = e.target.dataset.page;

  return currentPage;
}

function createPaginationBtnListMarkup(pages) {
  if (pages < 2) return '';
  let arrayOfBtn = [];

  for (let i = 0; i < pages; i += 1) {
    arrayOfBtn.push(i + 1);
  }

  arrayOfBtn.splice(1, 0, '...');
  arrayOfBtn.splice(arrayOfBtn.length - 1, 0, '...');
  arrayOfBtn.unshift('prev');
  arrayOfBtn.push('next');

  const lastPageNumber = arrayOfBtn.length - 4;
  const btnsArr = arrayOfBtn
    .map(item => paginationBtnMarkup(item, lastPageNumber))
    .join('');

  return btnsArr;
}

export async function renderPagination(pages) {
  if (!pages || pages < 2) return (refs.pagination.innerHTML = ''); // TODO -  передивитись блок іф
  refs.pagination.innerHTML = createPaginationBtnListMarkup(pages);
}

export function showPagBtns(currentPage) {
  const pagBtnsRef = refs.pagination.querySelectorAll('.paginationBtn');
  const pagExtraBtnsRef = refs.pagination.querySelectorAll('.paginationBtn__extra');
  const lastPage = pagBtnsRef.length;
  const NOB = 3; // NOB - number of (additional) bottons
  let minNOB = 1;
  let maxNOB = 7;

  if (currentPage > lastPage - NOB) {
    minNOB = lastPage - NOB*2;
    maxNOB = lastPage;
  } else if (currentPage > NOB + 1) {
    minNOB = currentPage - NOB;
    maxNOB = currentPage + NOB;
  }
  
  switch (currentPage) {
    case 1:
      for (const pagBtn of pagBtnsRef) {
        const pageNumber = Number(pagBtn.dataset.page);

        if (pageNumber === 1 || pageNumber === lastPage) continue;
        else if (pageNumber <= maxNOB) removeClass(pagBtn, 'isHidden');
        else addClass(pagBtn, 'isHidden');
      }

      addClass(pagExtraBtnsRef[0], 'isHidden');
      addClass(pagExtraBtnsRef[1], 'isHidden');
      removeClass(pagExtraBtnsRef[2], 'isHidden');
      removeClass(pagExtraBtnsRef[3], 'isHidden');
      break;

    case 6:
      for (const pagBtn of pagBtnsRef) {
        const pageNumber = Number(pagBtn.dataset.page);

        if (pageNumber === 1 || pageNumber === lastPage) continue;
        else if (pageNumber <= maxNOB) removeClass(pagBtn, 'isHidden');
        else addClass(pagBtn, 'isHidden');
      }

      removeClass(pagExtraBtnsRef[0], 'isHidden');
      addClass(pagExtraBtnsRef[1], 'isHidden');
      removeClass(pagExtraBtnsRef[2], 'isHidden');
      removeClass(pagExtraBtnsRef[3], 'isHidden');
      break;

    case lastPage-5:
      for (const pagBtn of pagBtnsRef) {
        const pageNumber = Number(pagBtn.dataset.page);

        if (pageNumber === 1 || pageNumber === lastPage) continue;
        else if (pageNumber >= minNOB) removeClass(pagBtn, 'isHidden');
        else addClass(pagBtn, 'isHidden');
      }

      console.log(minNOB);

      removeClass(pagExtraBtnsRef[0], 'isHidden');
      removeClass(pagExtraBtnsRef[1], 'isHidden');
      addClass(pagExtraBtnsRef[2], 'isHidden');
      removeClass(pagExtraBtnsRef[3], 'isHidden');
      break;

    case lastPage:
      for (const pagBtn of pagBtnsRef) {
        const pageNumber = Number(pagBtn.dataset.page);

        if (pageNumber === 1 || pageNumber === lastPage) continue;
        else if (pageNumber >= minNOB) removeClass(pagBtn, 'isHidden');
        else addClass(pagBtn, 'isHidden');
      }

      removeClass(pagExtraBtnsRef[0], 'isHidden');
      removeClass(pagExtraBtnsRef[1], 'isHidden');
      addClass(pagExtraBtnsRef[2], 'isHidden');
      addClass(pagExtraBtnsRef[3], 'isHidden');
      break;

    default:
      for (const pagBtn of pagBtnsRef) {
        const pageNumber = Number(pagBtn.dataset.page);

        if (pageNumber === 1 || pageNumber === lastPage) continue;
        else if (pageNumber < minNOB || pageNumber > maxNOB)
          addClass(pagBtn, 'isHidden');
        else removeClass(pagBtn, 'isHidden');
      }

      removeClass(pagExtraBtnsRef[0], 'isHidden');
      removeClass(pagExtraBtnsRef[3], 'isHidden');
      if (currentPage > 5) removeClass(pagExtraBtnsRef[1], 'isHidden');
      if (currentPage <= 5) addClass(pagExtraBtnsRef[1], 'isHidden');
      if (currentPage <= lastPage - 5)
        removeClass(pagExtraBtnsRef[2], 'isHidden');
  }
}

// TODO - add btn "Back to page number:"