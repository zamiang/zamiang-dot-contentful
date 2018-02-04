import * as marked from 'marked';
import * as moment from 'moment';
import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { fetchPosts } from '../actions/posts';
import PageNavigation from '../components/PageNavigation';
import * as styles from '../css/components/posts.css';
import { getPostQuery } from '../graphql/types';
import { ROOT_URL } from '../types';

interface IProps {
  history: History;
  match?: {
    params: {
      pageNumber: string;
    };
  };
}

interface IStateProps {
  posts: Array<getPostQuery['post']>;
  totalPosts: number;
}

interface IDispatchProps {
  fetchPosts: any;
}

type allProps = IProps & IStateProps & IDispatchProps;

function mapStateToProps(state: any) {
  return {
    posts: state.posts.posts,
    totalPosts: state.posts.totalPosts,
  };
}

const mapDispatchToProps = { fetchPosts };

class Posts extends React.Component<allProps, {}> {
  public static need = [fetchPosts];

  public componentWillReceiveProps(nextProps: allProps) {
    const { match } = this.props;

    // new page
    if (nextProps.match && nextProps.match.params.pageNumber) {
      if (match && match.params.pageNumber !== nextProps.match.params.pageNumber) {
        this.props.fetchPosts(nextProps.match.params.pageNumber);
      }
    }
  }

  public render() {
    const { posts, totalPosts, match } = this.props;
    const fullTitle = 'Brennan Moore | Posts';
    const pageNumber = match && match.params.pageNumber ? parseInt(match.params.pageNumber, 10) : 1;
    const postsHtml = posts.map(post => {
      if (!post) {
        return null;
      }
      return (
        <div key={post.id} className={styles.post}>
          <div className={styles.time}>{moment(post.date).format('Do MMMM YYYY')}</div>
          <div className={styles.title}>
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </div>
          <div className={styles.smallBorder} />
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: marked(post.body) }} />
          <div className={styles.bottomGradient} />
          <Link className={styles.moreLink} to={`/post/${post.slug}`}>
            Read More
          </Link>
        </div>
      );
    });
    return (
      <div>
        <Helmet
          title={fullTitle}
          link={[{ rel: 'canonical', href: `${ROOT_URL}/posts` }]}
          meta={[{ property: 'og:title', content: fullTitle }]}
        />
        <div>{postsHtml}</div>
        <PageNavigation currentPage={pageNumber} totalPosts={totalPosts} />
      </div>
    );
  }
}

export default compose<IProps>(
  withRouter,
  connect<IStateProps, IDispatchProps, IProps>(mapStateToProps, mapDispatchToProps),
)(Posts);
