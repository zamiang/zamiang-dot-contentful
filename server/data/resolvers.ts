import request from 'axios';
import { stringify } from 'querystring';
import * as types from '../../app/types';

const contentfulUrl =
  process.env.CONTENTFUL_URL || 'https://cdn.contentful.com/spaces/0hd36jc0fz5r';
const token =
  process.env.CONTENTFUL_KEY || '235c062dd801b1c35e907bab86628be95555be0f9cfc9c6296e28a90e58dc331';
const entriesUrl = `${contentfulUrl}/entries`;

interface IContentfulPost {
  sys: {
    id: string;
    updatedAt: string;
    createdAt: string;
  };
  fields: {
    slug: string;
    date: string;
    title: string;
    body: string;
  };
}

interface IContentfulResponse {
  data: {
    items: any[];
    total: number;
  };
}

interface IPostsOptions {
  page: number;
}

const formatPost = (post: IContentfulPost) => {
  return {
    id: post.sys.id,
    slug: post.fields.slug,
    date: post.sys.createdAt,
    modifiedDate: post.sys.updatedAt,
    title: post.fields.title,
    body: post.fields.body,
  };
};

const formatPostsContentfulResponse = (res: IContentfulResponse) => {
  const posts = res.data.items.map(formatPost);
  const total = res.data.total;
  return { posts, total };
};

const formatPostContentfulResponse = (res: IContentfulResponse) => {
  return res.data.items.map(formatPost)[0];
};

const getEntriesUrl = (type: string) => {
  const params = {
    access_token: token,
    content_type: type,
    include: 2,
  };
  return `${entriesUrl}?${stringify(params)}`;
};

const getEntryUrlBySlug = (slug: string, type: string) => {
  const params = {
    access_token: token,
    content_type: type,
    include: 2,
    limit: 1,
    'fields.slug': slug,
  };
  return `${entriesUrl}?${stringify(params)}`;
};

export const fetchPosts = async (options: IPostsOptions) => {
  const params = {
    order: '-fields.date',
    skip: (options.page - 1) * types.PAGE_SIZE || 0,
    limit: types.PAGE_SIZE,
  };

  const url = `${getEntriesUrl('post')}&${stringify(params)}`;
  return request.get(url).then(formatPostsContentfulResponse);
};

export const fetchPost = async (slug: string) => {
  return request.get(getEntryUrlBySlug(slug, 'post')).then(formatPostContentfulResponse);
};
