import { refs } from './refs';

refs.buttonSearch.addEventListener('click', onClickButton);

export default function onClickButton() {
  refs.buttonSearch.classList.add('is-click');
  refs.spinnerIcon.style.display = 'block';

  setTimeout(() => {
    refs.buttonSearch.classList.remove('is-click');
    refs.spinnerIcon.style.display = 'none';
  }, 2000);
}

// export { onClickButton };
