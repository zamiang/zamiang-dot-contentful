import * as classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router';
import * as styles from '../css/components/related-posts.css';
import { IPost } from '../interfaces';

const cx = classNames.bind(styles);

interface IRelatedPostProps {
  posts: IPost[];
}

const RelatedPosts = (props: IRelatedPostProps) => {
  const relatedPosts = props.posts.slice(0, 8).map(post => {
    return (
      <div key={post.id} className={cx('post')}>
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </div>
    );
  });
  return (
    <div className={cx('related-posts')}>
      <div className={cx('content')}>
        <h2 className={cx('caps')}>Featured Posts</h2>
        <div className={cx('small-border')} />
        <div className={cx('posts')}>{relatedPosts}</div>
      </div>
    </div>
  );
};

export default RelatedPosts;
