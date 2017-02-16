import request from 'axios';
import * as types from '../../app/types';
import { stringify } from 'querystring';

const contentfulUrl = process.env.CONTENTFUL_URL || 'https://cdn.contentful.com/spaces/0hd36jc0fz5r';
const token = process.env.CONTENTFUL_KEY || '235c062dd801b1c35e907bab86628be95555be0f9cfc9c6296e28a90e58dc331';
const entriesUrl = `${contentfulUrl}/entries`;

interface ContentfulPost {
  sys: {
    id: string;
    updatedAt: string;
  };
  fields: {
    slug: string;
    date: string;
    title: string;
    subtitle: string;
    body: string;
  };
}

interface ContentfulResponse {
  data: {
    items: Array<any>;
  };
}

interface PostsOptions {
  page: number;
}

const formatPost = (post: ContentfulPost) => {
  return {
    id: post.sys.id,
    slug: post.fields.slug,
    date: post.fields.date,
    modifiedDate: post.sys.updatedAt,
    title: post.fields.title,
    subtitle: post.fields.subtitle,
    body: post.fields.body,
  };
};

const formatPosts = (res: ContentfulResponse) => {
  return res.data.items.map(formatPost);
};

const getEntriesUrl = (type) => {
  const params = {
    access_token: token,
    content_type: type,
    include: 2,
  };
  return `${entriesUrl}?${stringify(params)}`;
};

const getEntryUrlBySlug = (slug, type) => {
  const params = {
    access_token: token,
    content_type: type,
    include: 2,
    limit: 1,
    'fields.slug': slug
  };
  return `${entriesUrl}?${stringify(params)}`;
};

export const fetchPosts = (options: PostsOptions) => {
  const params = {
    order: '-fields.date',
    skip: ((options.page - 1) * types.PAGE_SIZE) || 0,
    limit: types.PAGE_SIZE,
  };

  const url = `${getEntriesUrl('post')}&${stringify(params)}`;
  return request.get(url).then(formatPosts);
};

export const fetchPost = (slug: string) => {
  return request.get(getEntryUrlBySlug(slug, 'post')).then((res: ContentfulResponse) => formatPosts(res)[0]);
};
