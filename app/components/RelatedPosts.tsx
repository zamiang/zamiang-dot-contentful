import * as React from 'react';
import { Link } from 'react-router';
import { Post } from '../actions/action';

const classNames = require('classnames/bind');
const styles = require('../css/components/related-posts.css');
const cx = classNames.bind(styles);

interface RelatedPostProps {
  posts: Post[];
}

const RelatedPosts = (props: RelatedPostProps) => {
  const relatedPosts = props.posts.slice(0, 8).map((post) => {
    return (
      <div key={post.id} className={cx('post')}>
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </div>);
  });
  return (
    <div className={cx('related-posts')}>
      <div className={cx('content')}>
        <h2 className={cx('caps')}>Featured Posts</h2>
        <div className={cx('small-border')}></div>
        <div className={cx('posts')}>
          {relatedPosts}
        </div>
      </div>
    </div>);
};

export default RelatedPosts;