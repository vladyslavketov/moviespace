export default function paginationBtnMarkup(number, lastPageNumber) {
  let btn = '';
  let isHidden = '';
  if (number > 7) {
    isHidden = 'isHidden';
  }

  switch (number) {
    case 1:
      btn = `<button class="paginationBtn current" data-page="${number}" aria-label="to open page number ${number}" disabled>${number}</button>`;
      break;

    case lastPageNumber:
      btn = `<button class="paginationBtn" data-page="${number}" aria-label="to open page number ${number}">${number}</button>`;
      break;

    case '...':
      btn = `<button class="paginationBtn__extra paginationBtn__extra--decor isHidden" data-page="${number}" aria-label="decoration" disabled>${number}</button>`;
      break;

    case 'prev':
      btn = `<button class="paginationBtn__extra paginationBtn__extra--arrov isHidden" data-page="${number}" aria-label="to open previous page">${number}</button>`;
      break;

    case 'next':
      btn = `<button class="paginationBtn__extra paginationBtn__extra--arrov" data-page="${number}" aria-label="to open next page">${number}</button>`;
      break;

    default:
      btn = `<button class="paginationBtn ${isHidden}" data-page="${number}" aria-label="to open page number ${number}">${number}</button>`;
  }

  return btn;
}

//   <button class="paginationBtn ${current}" data-page="${number}" aria-label="to open page number ${number}">${number}</button>
