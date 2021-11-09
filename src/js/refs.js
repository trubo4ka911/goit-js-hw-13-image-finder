'use strict';

export default function getRefs() {
  return {
    searchForm: document.querySelector('.js-search-form'),
    galleryContainer: document.querySelector('.js-gallery-container'),
    loadMoreBtn: document.querySelector('.btn-load'),
  };
}
