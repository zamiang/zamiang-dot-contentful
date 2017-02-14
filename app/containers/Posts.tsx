import * as React from 'react';
import { connect } from 'react-redux';
import * as Helmet from 'react-helmet';
import * as marked from 'marked';
import * as moment from 'moment';
import { Link } from 'react-router';
import { ROOT_URL } from '../types';
import { fetchPosts } from '../actions/posts';
import { Post } from '../actions/action';

const classNames = require('classnames/bind');
const styles = require('../css/components/posts.css');
const cx = classNames.bind(styles);

interface Params {
  pageNumber: number;
}

interface PostsProps {
  posts: Array<Post>;
  totalPosts: number;
  currentPage: number;
  fetchPosts: any;
};

function mapStateToProps(state: any) {
  return {
    posts: state.posts.posts,
    totalPosts: state.navigation.totalPosts,
    currentPage: state.navigation.currentPage
  };
}

const mapDispatchToProps = { fetchPosts };

class Posts extends React.Component<PostsProps, any> {

  static defaultProps = {
    currentPage: 0,
  };

  static need = [
    fetchPosts,
  ];

  componentWillReceiveProps(nextProps: PostsProps) {
    const { currentPage } = this.props;

    // new page
    if (nextProps.currentPage !== currentPage) {
      this.props.fetchPosts(nextProps);
    }
  }

  render() {
    const { posts, totalPosts, currentPage } = this.props;
    const fullTitle = "Brennan Moore | Posts";
    const postsHtml = posts.map((post: Post) => {
      return (
        <div key={post.id} className={cx('post')}>
          <div className={cx('time')}>{moment(post.date).format('Do MMMM YYYY')}</div>
          <div className={cx('title')}><Link to={`/post/${post.slug}`}>{post.title}</Link></div>
          <div className={cx('small-border')} />
          <div className={cx('body')} dangerouslySetInnerHTML={{ __html: marked(post.body) }} />
          <div className={cx('bottom-gradient')}></div>
          <Link className={cx('more-link')} to={`/post/${post.slug}`}>Read More</Link>
        </div>
      );
    });
    return (
      <div className={cx('posts')}>
        <Helmet
          title={fullTitle}
          link={[
            { rel: 'canonical', href: `${ROOT_URL}/posts` },
          ]}
          meta={[
            { property: 'og:title', content: fullTitle }
          ]} />
        <div className={cx('section')}>
          {postsHtml}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);
