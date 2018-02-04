import * as React from 'react';
import { Link } from 'react-router';
import * as styles from '../css/components/related-posts.css';
import { getPostQuery } from '../graphql/types';

interface IRelatedPostProps {
  posts: Array<getPostQuery['post']>;
}

const RelatedPosts = (props: IRelatedPostProps) => {
  const relatedPosts = props.posts.slice(0, 8).map(post => {
    if (post) {
      return (
        <div key={post.id} className={styles.post}>
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </div>
      );
    }
  });
  return (
    <div className={styles.relatedPosts}>
      <div className={styles.content}>
        <h2 className={styles.caps}>Featured Posts</h2>
        <div className={styles.smallBorder} />
        <div className={styles.posts}>{relatedPosts}</div>
      </div>
    </div>
  );
};

export default RelatedPosts;
