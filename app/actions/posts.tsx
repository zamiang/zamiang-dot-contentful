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
  const query = `{ posts(page: ${pageNumber}) { id, slug, date, updatedAt, title, body } }`;
  const url = '/graphql?';
  return {
    type: types.GET_POSTS,
    promise: request.post(url, {
      query,
    }),
  };
}

export function fetchPost(params: Params) {
  const query = `{ post(slug: "${params.postSlug}") { id, slug, date, updatedAt, title, body } }`;
  const url = '/graphql';
  return {
    type: types.GET_POST,
    promise: request.post(url, {
      query,
    })
  };
}
