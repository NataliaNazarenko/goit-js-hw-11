import axios from 'axios';

const API_KEY = '35413262-7ae9db1d2d6405a91836db282';
const URL = 'https://pixabay.com/api';

export default class NewsApiService {
  constructor(totalHits = 0) {
    this.key = API_KEY;
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.totalPages = 0;
    this.totalHits = totalHits;
  }

  async getImages() {
    const { data } = await axios.get(
      `${URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    this.incrementPage();
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
    this.totalPages = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  countTotalPages(totalHits) {
    return (this.totalPages = Math.ceil(totalHits / this.per_page));
  }
}
