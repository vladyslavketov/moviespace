import refs from './refs';
import { showBtnUp, hideBtnUp, onBtnUpClick } from '../../components/btns/btn-up/btn-up';

window.addEventListener('scroll', onWindowScroll);
refs.btnUp.addEventListener('click', onBtnUpClick);

function onWindowScroll() {
  const windowPageYOffset = window.pageYOffset;

  if (windowPageYOffset > 40) {
    refs.body.classList.add('isScrolling');

    if (windowPageYOffset > 500) showBtnUp();
    else if (windowPageYOffset <= 500) hideBtnUp();
  } else if (windowPageYOffset <= 40) refs.body.classList.remove('isScrolling');
}