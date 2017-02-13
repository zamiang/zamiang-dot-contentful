import { stringify } from 'querystring';
import request from 'axios';
import * as types from '../types';
import { getEntriesUrl, getEntryUrlBySlug } from '../helpers/contentful';

interface Options {
  pageNumber: number;
};

interface Params {
  articleSlug: string;
}

export function fetchArticles(options: Options) {
  const params = {
    order: '-fields.date',
    skip: ((options.pageNumber - 1) * types.PAGE_SIZE) || 0,
    limit: types.PAGE_SIZE,
  };

  const url = `${getEntriesUrl('post')}&${stringify(params)}`;
  console.log(url);
  return {
    type: types.GET_ARTICLES,
    promise: request.get(url),
  };
}

export function fetchArticle(params: Params) {
  return {
    type: types.GET_ARTICLE,
    promise: request.get(getEntryUrlBySlug(params.articleSlug, 'article'))
  };
}
