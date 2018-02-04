import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions/posts';
import * as styles from '../css/components/home.css';
import { IPost } from '../interfaces';
import { ROOT_URL } from '../types';

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
        <li key={post.id} className={styles.post}>
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </li>
      );
    });
    return (
      <div className={styles.home}>
        <Helmet
          title={fullTitle}
          link={[{ rel: 'canonical', href: ROOT_URL }]}
          meta={[{ property: 'og:title', content: fullTitle }]}
        />
        <div className={styles.sideGradient} />
        <div className={styles.section}>
          <div className={styles.portrait}>
            <img src="https://secure.gravatar.com/avatar/ed442a2cfbe84d5bf40e09c58ba80b5f?size=200" />
          </div>
          <div>
            <p className={styles.name}>Brennan Moore</p>
            <p className={styles.subheading}>
              I'm a product engineer based in NYC. I'm passionate about building innovative digital
              products people love.
            </p>
            <p className={styles.ellipsis}>&hellip;</p>
            <p className={styles.links}>
              <Link to={'/posts'}>blog</Link>&nbsp;&sdot;
              <a href="https://github.com/zamiang">github</a>&nbsp;&sdot;
              <a href="http://twitter.com/zamiang">twitter</a>
            </p>
            <p className={styles.ellipsis}>&hellip;</p>
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.caps}>Posts</h2>
          <div className={styles.smallBorder} />
          <ul className={styles.posts}>{postsHtml}</ul>
        </div>
        <div className={styles.section}>
          <h2 className={styles.caps}>Projects</h2>
          <div className={styles.smallBorder} />
          <div className={styles.project}>
            <h2>
              <a href="http://www.vislet.com">Vislet</a>
            </h2>
            <div className={styles.description}>
              Small interactive visualizations to help us understand the cities we live in.
            </div>
          </div>
          <div className={styles.project}>
            <h2>
              <a href="https://artsy.net">Artsy</a>
            </h2>
            <div className={styles.description}>
              Director of Web Engineering 2011-2014, responsible for making sure Artsy’s public
              facing web presence is fast and maintainable.
            </div>
          </div>
          <div className={styles.project}>
            <h2>
              <a href="https://iphone.artsy.net">Flare</a>
            </h2>
            <div className={styles.description}>Artsy iPhone app launch marketing page.</div>
          </div>
          <div className={styles.project}>
            <h2>
              <a href="http://zamiang.github.io/jquery.poplockit">poplockit</a>
            </h2>
            <div className={styles.description}>
              A jQuery plugin for ‘locking’ short content in place as the user scrolls by longer
              content.
            </div>
          </div>
          <div className={styles.project}>
            <h2>
              <a href="http://www.kickstarter.com/projects/zamiang/explore-and-organize-your-data-with-poyozo">
                Poyozo
              </a>
            </h2>
            <div className={styles.description}>
              Poyozo helps you keep track of and understand your life by integrating automatic
              life-tracking with simple visualizations that you can use every day.
            </div>
          </div>
          <div className={styles.project}>
            <h2>
              <a href="https://code.google.com/p/list-it/">Atomate</a>
            </h2>
            <div className={styles.description}>
              Context-sensitive automation using heterogeneous information sources on the web.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
