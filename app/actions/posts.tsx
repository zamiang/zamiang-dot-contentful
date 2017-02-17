import request from "axios";
import * as types from "../types";

interface IOptions {
  pageNumber: number;
};

interface IParams {
  postSlug: string;
}

export function fetchPosts(options: IOptions) {
  const pageNumber = options.pageNumber || 1;
  const query = `{
  posts(page: ${pageNumber}) {
    pageInfo {
      total
    }
    edges {
      node {
        id
        slug
        date
        updatedAt
        title
        body
      }
    }
  } }`;
  const url = "/graphql";
  return {
    type: types.GET_POSTS,
    promise: request.post(url, {
      query,
    }),
  };
}

export function fetchPost(params: IParams) {
  const query = `{ post(slug: "${params.postSlug}") { id, slug, date, updatedAt, title, body } }`;
  const url = "/graphql";
  return {
    type: types.GET_POST,
    promise: request.post(url, {
      query,
    }),
  };
}
