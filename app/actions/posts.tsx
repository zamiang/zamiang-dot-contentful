import request from 'axios';
import * as postQuery from '../graphql/queries/get-post.graphql';
import * as postsQuery from '../graphql/queries/get-posts.graphql';
import * as types from '../types';

interface IOptions {
  pageNumber: number;
}

interface IParams {
  postSlug: string;
}

export function fetchPosts(options: IOptions) {
  const pageNumber = options.pageNumber || 1;
  const url = '/graphql';
  return {
    type: types.GET_POSTS,
    promise: request.post(url, {
      query: postsQuery,
      variables: { page: pageNumber },
    }),
  };
}

export function fetchPost(params: IParams) {
  const url = '/graphql';
  return {
    type: types.GET_POST,
    promise: request.post(url, {
      query: postQuery,
      variables: { slug: params.postSlug },
    }),
  };
}
