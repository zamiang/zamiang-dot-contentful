import { stringify } from 'querystring';
import request from 'axios';
import * as types from '../types';

interface Options {
  pageNumber: number;
};

export function fetchArticles(options: Options) {
  const params = {
    order: '-fields.publicationDate',
    skip: ((options.pageNumber - 1) * types.PAGE_SIZE) || 0,
    limit: types.PAGE_SIZE
  };
  return {
    type: types.GET_ARTICLES,
    promise: request.get('/TODO')
  };
}

export function fetchArticle() {
  return {
    type: types.GET_ARTICLE,
    promise: request.get('/TODO')
  };
}
