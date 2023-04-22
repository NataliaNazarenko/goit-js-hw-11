import axios from 'axios';

const API_KEY = '35413262-7ae9db1d2d6405a91836db282';
const URL = 'https://pixabay.com/api';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
    this.total = 0;
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

  // get total() {
  //   return this.total;
  // }

  // set total(newTotal) {
  //   this.total = newTotal;
  // }
}
