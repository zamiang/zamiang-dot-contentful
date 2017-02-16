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
  const query = `{
    posts(page: ${options.pageNumber}) {
      id, slug, date, updatedAt, title, subtitle, body
    }
  }`;
  const url = `/graphql?query=${query}`;
  return {
    type: types.GET_POSTS,
    promise: request.get(url),
  };
}

export function fetchPost(params: Params) {
  const query = `
    {
      post(slug: ${params.postSlug}) {
        id, slug, date, updatedAt, title, subtitle, body
      }
    }
  `;
  const url = `/graphql?query=${query}`;
  return {
    type: types.GET_POST,
    promise: request.get(query)
  };
}
