import * as classNames from 'classnames';
import * as React from 'react';
import * as Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions/posts';
import * as styles from '../css/components/home.css';
import { IPost } from '../interfaces';
import { ROOT_URL } from '../types';

const cx = classNames.bind(styles);

interface IParams {
  pageNumber: number;
}

interface IHomeProps {
  posts: IPost[];
  totalPosts: number;
  currentPage: number;
  fetchPosts: any;
}

function mapStateToProps(state: any) {
  return {
    posts: state.posts.posts,
  };
}

const mapDispatchToProps = { fetchPosts };

class Home extends React.Component<IHomeProps, any> {
  public static defaultProps = {
    currentPage: 1,
  };

  public static need = [fetchPosts];

  public componentWillReceiveProps(nextProps: IHomeProps) {
    const { currentPage } = this.props;

    // new page
    if (nextProps.currentPage !== currentPage) {
      this.props.fetchPosts(nextProps);
    }
  }

  public render() {
    const { posts } = this.props;
    const fullTitle = "Brennan Moore | I'm a product engineer based in NYC.";
    const postsHtml = posts.map((post: IPost) => {
      return (
        <li key={post.id} className={cx('post')}>
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </li>
      );
    });
    return (
      <div className={cx('home')}>
        <Helmet
          title={fullTitle}
          link={[{ rel: 'canonical', href: ROOT_URL }]}
          meta={[{ property: 'og:title', content: fullTitle }]}
        />
        <div className={cx('side-gradient')} />
        <div className={cx('section')}>
          <div className={cx('portrait')}>
            <img src="https://secure.gravatar.com/avatar/ed442a2cfbe84d5bf40e09c58ba80b5f?size=200" />
          </div>
          <div className={cx('info')}>
            <p className={cx('name')}>Brennan Moore</p>
            <p className={cx('subheading')}>
              I'm a product engineer based in NYC. I'm passionate about building innovative digital
              products people love.
            </p>
            <p className={cx('ellipsis')}>&hellip;</p>
            <p className={cx('links')}>
              <Link to={'/posts'}>blog</Link>&nbsp;&sdot;
              <a href="https://github.com/zamiang">github</a>&nbsp;&sdot;
              <a href="http://twitter.com/zamiang">twitter</a>
            </p>
            <p className={cx('ellipsis')}>&hellip;</p>
          </div>
        </div>
        <div className={cx('section')}>
          <h2 className={cx('caps')}>Posts</h2>
          <div className={cx('small-border')} />
          <ul className={cx('posts')}>{postsHtml}</ul>
        </div>
        <div className={cx('section')}>
          <h2 className={cx('caps')}>Projects</h2>
          <div className={cx('small-border')} />
          <div className={cx('project')}>
            <h2>
              <a href="http://www.vislet.com">Vislet</a>
            </h2>
            <div className={cx('description')}>
              Small interactive visualizations to help us understand the cities we live in.
            </div>
          </div>
          <div className={cx('project')}>
            <h2>
              <a href="https://artsy.net">Artsy</a>
            </h2>
            <div className={cx('description')}>
              Director of Web Engineering 2011-2014, responsible for making sure Artsy’s public
              facing web presence is fast and maintainable.
            </div>
          </div>
          <div className={cx('project')}>
            <h2>
              <a href="https://iphone.artsy.net">Flare</a>
            </h2>
            <div className={cx('description')}>Artsy iPhone app launch marketing page.</div>
          </div>
          <div className={cx('project')}>
            <h2>
              <a href="http://zamiang.github.io/jquery.poplockit">poplockit</a>
            </h2>
            <div className={cx('description')}>
              A jQuery plugin for ‘locking’ short content in place as the user scrolls by longer
              content.
            </div>
          </div>
          <div className={cx('project')}>
            <h2>
              <a href="http://www.kickstarter.com/projects/zamiang/explore-and-organize-your-data-with-poyozo">
                Poyozo
              </a>
            </h2>
            <div className={cx('description')}>
              Poyozo helps you keep track of and understand your life by integrating automatic
              life-tracking with simple visualizations that you can use every day.
            </div>
          </div>
          <div className={cx('project')}>
            <h2>
              <a href="https://code.google.com/p/list-it/">Atomate</a>
            </h2>
            <div className={cx('description')}>
              Context-sensitive automation using heterogeneous information sources on the web.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
