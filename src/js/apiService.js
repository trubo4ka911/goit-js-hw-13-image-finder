'use strict';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchCards() {
    const KEY = '24184447-ca4d69a4e7056aa9c5fd9d78f';
    const url = `https://pixabay.com/api/?key=${KEY}&q=${this.searchQuery}&image_type=photo&per_page=12&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
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
};
