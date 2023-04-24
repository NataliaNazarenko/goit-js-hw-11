import axios from 'axios';

const API_KEY = '35413262-7ae9db1d2d6405a91836db282';
const URL = 'https://pixabay.com/api';

export default class NewsApiService {
  constructor(total, totalHits) {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = totalHits;
    this.total = total;
    this.key = API_KEY;
    this.remainder = 0;
  }

  async getImages() {
    const { data } = await axios.get(
      `${URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );

    this.incrementPage();
    this.incrementTotalHits();
    this.leftImages();
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get hits() {
    return this.totalHits;
  }

  set hits(newHits) {
    this.totalHits = newHits;
  }

  incrementTotalHits() {
    this.totalHits += this.totalHits;
  }

  leftImages() {
    this.remainder = this.total - this.totalHits;
  }
}
