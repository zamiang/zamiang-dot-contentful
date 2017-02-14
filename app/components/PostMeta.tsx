import * as React from 'react';
import * as Helmet from 'react-helmet';
import { ROOT_URL } from '../types';
import { Post } from '../actions/action';

interface Props {
  post: Post;
}

const PostMeta = (props: Props) => {
  const { post } = props;
  const fullTitle = `${post.title} | Brennan Moore`;
  const fullUrl = `${ROOT_URL}/post/${post.slug}`;
  return (
    <Helmet
      title={fullTitle}
      link={[
        { rel: 'canonical', href: fullUrl }
      ]} />);
};

export default PostMeta;
