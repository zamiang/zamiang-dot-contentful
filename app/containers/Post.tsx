import * as marked from 'marked';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchPosts } from '../actions/posts';
import PostMeta from '../components/PostMeta';
import RelatedPosts from '../components/RelatedPosts';
import * as styles from '../css/components/post.css';
import { getPostQuery } from '../graphql/types';

interface IPostProps extends React.Props<any> {
  post: getPostQuery['post'];
  posts: Array<getPostQuery['post']>;
  isLoading: boolean;
  params?: any;
  fetchPost: any;
}

function mapStateToProps(state: any) {
  return {
    post: state.posts.post,
    posts: state.posts.posts,
    isLoading: state.posts.isLoading,
  };
}

const mapDispatchToProps = { fetchPost };

class PostContainer extends React.Component<IPostProps, any> {
  public static need = [fetchPost, fetchPosts];

  public static defaultProps = {
    isLoading: false,
  };

  public componentWillReceiveProps(nextProps: IPostProps) {
    const { params } = this.props;

    // new post navigated to
    // TODO check this
    if (
      nextProps.params &&
      nextProps.params.postSlug &&
      nextProps.params.postSlug !== params.postSlug
    ) {
      this.props.fetchPost(nextProps.params);
    }
  }

  public render() {
    const { post, posts } = this.props;
    if (!post) {
      return null;
    }

    const body = post.body ? marked(post.body) : '';
    return (
      <div>
        <PostMeta post={post} />
        <div className={styles.post}>
          <div className={styles.time}>{moment(post.date).format('Do MMMM YYYY')}</div>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.smallBorder} />
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
        </div>
        <RelatedPosts posts={posts} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
