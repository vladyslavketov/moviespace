export default function setCurrentClass(querySelector, currentPage, e) {
  const currentEl = document.querySelector(querySelector);
  if (currentEl) currentEl.classList.remove('current');

  if (currentPage) {
    const currentBtnRef = document.querySelector(`[data-page='${currentPage}']`);
    currentBtnRef.classList.add('current');
  } else e.target.classList.add('current');
}