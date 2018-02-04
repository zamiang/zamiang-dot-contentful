import * as React from 'react';
import Helmet from 'react-helmet';
import { getPostQuery } from '../graphql/types';
import { ROOT_URL } from '../types';

interface IProps {
  post: getPostQuery['post'];
}

const PostMeta = (props: IProps) => {
  const { post } = props;
  const fullTitle = post ? `${post.title} | Brennan Moore` : '';
  const fullUrl = post ? `${ROOT_URL}/post/${post.slug}` : '';
  return <Helmet title={fullTitle} link={[{ rel: 'canonical', href: fullUrl }]} />;
};

export default PostMeta;
