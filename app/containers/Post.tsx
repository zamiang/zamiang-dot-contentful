import * as React from 'react';
import { connect } from 'react-redux';
import * as marked from 'marked';
import * as moment from 'moment';
import { Link } from 'react-router';
import { fetchPost, fetchPosts } from '../actions/posts';
import PostMeta from '../components/PostMeta';
import RelatedPosts from '../components/RelatedPosts';
import { Post } from '../actions/action';

const classNames = require('classnames/bind');
const styles = require('../css/components/post.css');
const cx = classNames.bind(styles);

interface PostProps extends React.Props<any> {
  post: Post;
  posts: Post[];
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

class PostContainer extends React.Component<PostProps, any> {

  static need = [
    fetchPost,
    fetchPosts,
  ];

  static defaultProps = {
    isLoading: false,
  };

  componentWillReceiveProps(nextProps: PostProps) {
    const { params } = this.props;

    // new post navigated to
    // TODO check this
    if (nextProps.params.postSlug && nextProps.params.postSlug !== params.postSlug) {
      this.props.fetchPost(nextProps.params);
    }
  }

  render() {
    const { post, posts } = this.props;
    const body = post.body ? marked(post.body) : '';
    return (
      <div>
        <PostMeta post={post} />
        <div className={cx('post')}>
          <div className={cx('time')}>{moment(post.date).format('Do MMMM YYYY')}</div>
          <div className={cx('title')}>{post.title}</div>
          <div className={cx('small-border')} />
          <div className={cx('body')} dangerouslySetInnerHTML={{ __html: body }} />
          <div className={cx('bottom-gradient')}></div>
        </div>
        <RelatedPosts posts={posts} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostContainer);
