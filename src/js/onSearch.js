'use strict';

import apiService from './apiService';
import getRefs from './refs';
import cardMarkupTpl from '../templates/cardMarkup.hbs';
import LoadMoreBtn from './laod-more-btn';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { showAlert, ALERTS } from './alert.js';

const debounce = require('lodash.debounce');
const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newApiService = new apiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', debounce(fetchImages, 200));

function onSearch(e) {
  e.preventDefault();
  newApiService.query = e.currentTarget.elements.query.value;
  if (newApiService.query === '') {
    return showAlert(ALERTS.EMPTY);
  }
  loadMoreBtn.show();
  newApiService.resetPage();
  clearCardMarkup();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  newApiService.fetchCards().then(hits => {
    if (!hits.length) {
      return showAlert(hits, ALERTS.NOT_FOUND);
    }
    appendCardMarkup(hits);
    loadMoreBtn.enable();
  });
}

function appendCardMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', cardMarkupTpl(hits));
  scrollInto();
}

function clearCardMarkup() {
  refs.galleryContainer.innerHTML = '';
}

function scrollInto() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

refs.galleryContainer.addEventListener('click', openLargeImage);

function openLargeImage(e) {
  if (!e.target.dataset.source) {
    return;
  }
  const instance = basicLightbox.create(`<img src="${e.target.dataset.source}" />`);
  instance.show();
}
