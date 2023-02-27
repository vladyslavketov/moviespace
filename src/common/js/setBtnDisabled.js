export default function setBtnDisabled(querySelector, currentPage, e) {
  const disableBtn = document.querySelector(`${querySelector}[disabled]`);
  if (disableBtn) disableBtn.disabled = false;

  if (currentPage) {
    const currentBtnRef = document.querySelector(`[data-page='${currentPage}']`);
    currentBtnRef.disabled = true;
  } else e.target.disabled = true;
}