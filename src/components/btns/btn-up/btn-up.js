import refs from '../../../common/js/refs';

export function showBtnUp() {
  refs.btnUp.classList.remove('isHidden');
}

export function hideBtnUp() {
  refs.btnUp.classList.add('isHidden');
}

export function onBtnUpClick() {
  window.scrollTo(0, 0);
}