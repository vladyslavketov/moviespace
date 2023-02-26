import refs from '../../common/js/refs';
import paginationBtnMarkup from '../../templates/paginationBtnMarkup';
import { addClass, removeClass } from '../../common/js/toggleClass';

export function getCurrentPage(e) {
  if (!e) return "1";
  return e.target.dataset.page;
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

export function hideShowBtn(e) {
  const currentPage = getCurrentPage(e);
  const pagBtnsRef = refs.pagination.querySelectorAll('.paginationBtn');
  const pagExtraBtnsRef = refs.pagination.querySelectorAll(
    '.paginationBtn__extra'
  );
  const NOB = 3; // NOB - number of (additional) bottons

  const currentPagListMin = currentPage > NOB ? Number(currentPage) - NOB : 1;
  const currentPagListMax = currentPage > NOB ? Number(currentPage) + NOB : 7;

  for (const pagBtn of pagBtnsRef) {
    if (
      pagBtn.dataset.page < currentPagListMin ||
      pagBtn.dataset.page > currentPagListMax
    ) {
      addClass(pagBtn, 'isHidden');
    } else {
      removeClass(pagBtn, 'isHidden');
    }
  }
  // === btn FIRST page and LAST page ===
  removeClass(pagBtnsRef[0], 'isHidden');
  removeClass(pagBtnsRef[pagBtnsRef.length - 1], 'isHidden');

  // === btn decoration ===
  removeClass(pagExtraBtnsRef[1], 'isHidden');
  if (window.innerWidth > 767 && currentPage > '5')
    removeClass(pagExtraBtnsRef[0], 'isHidden');
}

export function showPagBtns(e) {
  const pagBtnsRef = refs.pagination.querySelectorAll('.paginationBtn');
  const pagExtraBtnsRef = refs.pagination.querySelectorAll('.paginationBtn__extra');
  const lastPage = pagBtnsRef.length;
  const currentPage = Number(getCurrentPage(e));
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
  
  // console.log('currentPage', currentPage);
  // console.log('minNOB', minNOB);
  // console.log('maxNOB', maxNOB);
  // console.log('lastPage', lastPage);
  
  switch (currentPage) {
    case 1:
      for (const pagBtn of pagBtnsRef) {
        const pageNumber = Number(pagBtn.dataset.page);

        if (pageNumber === 1 || pageNumber === lastPage) continue;
        else if (pageNumber <= maxNOB) removeClass(pagBtn, 'isHidden');
        else addClass(pagBtn, 'isHidden');
      };

      addClass(pagExtraBtnsRef[0], 'isHidden');
      addClass(pagExtraBtnsRef[1], 'isHidden');
      removeClass(pagExtraBtnsRef[2], 'isHidden');
      removeClass(pagExtraBtnsRef[3], 'isHidden');
      break;
    
    case lastPage:
      for (const pagBtn of pagBtnsRef) {
        const pageNumber = Number(pagBtn.dataset.page);

        if (pageNumber === 1 || pageNumber === lastPage) continue;
        else if (pageNumber >= minNOB) removeClass(pagBtn, 'isHidden');
        else addClass(pagBtn, 'isHidden');
      };

      removeClass(pagExtraBtnsRef[0], 'isHidden');
      removeClass(pagExtraBtnsRef[1], 'isHidden');
      addClass(pagExtraBtnsRef[2], 'isHidden');
      addClass(pagExtraBtnsRef[3], 'isHidden');
      break;

    default:
      for (const pagBtn of pagBtnsRef) {
        const pageNumber = Number(pagBtn.dataset.page);

        if (pageNumber === 1 || pageNumber === lastPage) continue;
        else if (pageNumber < minNOB || pageNumber > maxNOB) addClass(pagBtn, 'isHidden');
        else removeClass(pagBtn, 'isHidden');
      }

      removeClass(pagExtraBtnsRef[0], 'isHidden');
      removeClass(pagExtraBtnsRef[3], 'isHidden');
      if (currentPage > 5) removeClass(pagExtraBtnsRef[1], 'isHidden');
      if (currentPage <= lastPage-5) removeClass(pagExtraBtnsRef[2], 'isHidden');
  }
}

// TODO - add btn "Back to page number:"
