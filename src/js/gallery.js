import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';
import NewsApiService from './GetApi';
import LoadMoreBtn from './LoadMoreBtn';
import onClickButton from './SearchButton';

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

loadMoreBtn.hide();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', fetchImages);

function onSearch(event) {
  event.preventDefault();
  loadMoreBtn.hide();
  newsApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();
  clearNewsList();
  fetchImages();
  totalFoundImages();
  gallery.refresh();
}

async function fetchImages() {
  onClickButton();
  try {
    const markup = await getImagesMarkup();
    updateNewsList(markup);
    loadMoreBtn.show();
    loadMoreBtn.enable();
    gallery.refresh();
  } catch (error) {
    onFetchError(error);
  }
}

async function getImagesMarkup() {
  try {
    const { hits } = await newsApiService.getImages();

    if (hits.length === 0) {
      Notify.info('Sorry, there are no images matching your search query. Please try again.');
      loadMoreBtn.hide();
    }
    return hits.reduce((markup, hit) => markup + createMarkup(hit), '');
  } catch (error) {
    onFetchError(error);
  }
}

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function createMarkup({ largeImageURL, tags, webformatURL, likes, views, comments, downloads }) {
  return `
   <div class='photo__card'>
    <a href='${largeImageURL}' alt='${tags}' class='photo__link'>
     <img src='${webformatURL}' alt='${tags}' loading='lazy' class='photo__image' />
    </a>
        <div class='info overlay'>
      <p class='info-item'>
        <b>Likes</b>${likes}
      </p>
      <p class='info-item'>
        <b>Views</b>${views}
      </p>
      <p class='info-item'>
        <b>Comments</b>${comments}
      </p>
      <p class='info-item'>
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`;
}

function updateNewsList(markup) {
  if (markup !== undefined) refs.gallery.insertAdjacentHTML('beforeend', markup);

  loadMoreBtn.hide();
  loadMoreBtn.enable();
}

function clearNewsList() {
  refs.gallery.innerHTML = '';
}

function onFetchError(error) {
  if (!error.status) {
    loadMoreBtn.hide();
    Notify.failure('Oops, there is no country with that name');
  }
}

function slowScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function totalFoundImages() {
  try {
    newsApiService.getImages().then(({ totalHits }) => {
      return Notify.success(`Hooray! We found ${totalHits} images.`);
    });
  } catch (error) {
    onFetchError(error);
  }
}

function totalRunOutImages() {
  let total = newsApiService.getImages().then();
  console.log(total);
  newsApiService.getImages().then(({ totalHits, total }) => {
    if (totalHits === total) {
      return Notify.success("We're sorry, but you've reached the end of search results.");
    }
  });
}
