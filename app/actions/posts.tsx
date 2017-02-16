import { stringify } from 'querystring';
import request from 'axios';
import * as types from '../types';

interface Options {
  pageNumber: number;
};

interface Params {
  postSlug: string;
}

export function fetchPosts(options: Options) {
  const pageNumber = options.pageNumber || 1;
  const query = { query: `{ posts(page: ${pageNumber}) { id } }`};
  const url = `/graphql?${stringify(query)}`;
  return {
    type: types.GET_POSTS,
    promise: request.post(url),
  };
}

export function fetchPost(params: Params) {
  const query = { query: `{
    {
      post(slug: ${params.postSlug}) {
        id, slug, date, updatedAt, title, subtitle, body
      }
    }
  `};
  const url = `/graphql?${stringify(query)}`;
  return {
    type: types.GET_POST,
    promise: request.post(url)
  };
}
