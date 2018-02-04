import * as classNames from 'classnames';
import * as marked from 'marked';
import * as moment from 'moment';
import * as React from 'react';
import * as Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions/posts';
import PageNavigation from '../components/PageNavigation';
import * as styles from '../css/components/posts.css';
import { IPost } from '../interfaces';
import { ROOT_URL } from '../types';

const cx = classNames.bind(styles);

interface IPostsProps {
  posts: IPost[];
  totalPosts: number;
  params?: any;
  fetchPosts: any;
}

function mapStateToProps(state: any) {
  return {
    posts: state.posts.posts,
    totalPosts: state.posts.totalPosts,
  };
}

const mapDispatchToProps = { fetchPosts };

class Posts extends React.Component<IPostsProps, any> {
  public static defaultProps = {
    currentPage: 1,
  };

  public static need = [fetchPosts];

  public componentWillReceiveProps(nextProps: IPostsProps) {
    const { params } = this.props;

    // new page
    if (nextProps.params.pageNumber !== params.pageNumber) {
      this.props.fetchPosts(nextProps.params);
    }
  }

  public render() {
    const { posts, totalPosts, params } = this.props;
    const fullTitle = 'Brennan Moore | Posts';
    const pageNumber = params.pageNumber || 1;
    const postsHtml = posts.map((post: IPost) => {
      return (
        <div key={post.id} className={cx('post')}>
          <div className={cx('time')}>{moment(post.date).format('Do MMMM YYYY')}</div>
          <div className={cx('title')}>
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </div>
          <div className={cx('small-border')} />
          <div className={cx('body')} dangerouslySetInnerHTML={{ __html: marked(post.body) }} />
          <div className={cx('bottom-gradient')} />
          <Link className={cx('more-link')} to={`/post/${post.slug}`}>
            Read More
          </Link>
        </div>
      );
    });
    return (
      <div className={cx('posts')}>
        <Helmet
          title={fullTitle}
          link={[{ rel: 'canonical', href: `${ROOT_URL}/posts` }]}
          meta={[{ property: 'og:title', content: fullTitle }]}
        />
        <div className={cx('section')}>{postsHtml}</div>
        <PageNavigation currentPage={pageNumber} totalPosts={totalPosts} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
