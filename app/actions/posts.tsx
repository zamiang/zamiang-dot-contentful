import { stringify } from 'querystring';
import request from 'axios';
import * as types from '../types';
import { getEntriesUrl, getEntryUrlBySlug } from '../helpers/contentful';

interface Options {
  pageNumber: number;
};

interface Params {
  postSlug: string;
}

export function fetchPosts(options: Options) {
  const params = {
    order: '-fields.date',
    skip: ((options.pageNumber - 1) * types.PAGE_SIZE) || 0,
    limit: types.PAGE_SIZE,
  };

  const url = `${getEntriesUrl('post')}&${stringify(params)}`;
  return {
    type: types.GET_POSTS,
    promise: request.get(url),
  };
}

export function fetchPost(params: Params) {
  return {
    type: types.GET_POST,
    promise: request.get(getEntryUrlBySlug(params.postSlug, 'post'))
  };
}
