/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface getPostQueryVariables {
  slug: string,
};

export interface getPostQuery {
  post:  {
    id: string,
    slug: string,
    date: string,
    updatedAt: string | null,
    title: string,
    body: string,
  } | null,
};

export interface getPostsQueryVariables {
  page?: number | null,
};

export interface getPostsQuery {
  posts:  {
    pageInfo:  {
      total: number | null,
    },
    edges:  Array< {
      node:  {
        id: string,
        slug: string,
        date: string,
        updatedAt: string | null,
        title: string,
        body: string,
      } | null,
    } >,
  } | null,
};
