import * as React from 'react';
import { connect } from 'react-redux';
import * as Helmet from 'react-helmet';
import { Link } from 'react-router';
import { ROOT_URL } from '../types';
import { fetchArticles } from '../actions/articles';
import { Article } from '../actions/action';

const classNames = require('classnames/bind');
const styles = require('../css/components/home.css');
const cx = classNames.bind(styles);

interface Params {
  pageNumber: number;
}

interface HomeProps {
  articles: Array<Article>;
  totalArticles: number;
  currentPage: number;
  fetchArticles: any;
};

function mapStateToProps(state: any) {
  return {
    articles: state.article.articles,
    totalArticles: state.navigation.totalArticles,
    currentPage: state.navigation.currentPage
  };
}

const mapDispatchToProps = { fetchArticles };

class Home extends React.Component<HomeProps, any> {

  static defaultProps = {
    currentPage: 0,
  };

  static need = [
    fetchArticles,
  ];

  componentWillReceiveProps(nextProps: HomeProps) {
    const { currentPage } = this.props;

    // new page
    if (nextProps.currentPage !== currentPage) {
      this.props.fetchArticles(nextProps);
    }
  }

  render() {
    const { articles, totalArticles, currentPage } = this.props;
    const fullTitle = "Brennan Moore | I'm a product engineer based in NYC.";
    return (
      <div className={cx('home')}>
        <Helmet
          title={fullTitle}
          link={[
            { rel: 'canonical', href: ROOT_URL },
          ]}
          meta={[
            { property: 'og:title', content: fullTitle }
          ]} />
        <div className={cx('section')}>
          <div className={cx('portrait')}>
            <img src="https://secure.gravatar.com/avatar/ed442a2cfbe84d5bf40e09c58ba80b5f?size=200" />
          </div>
          <div className={cx('info')}>
            <p className={cx('name')}>Brennan Moore</p>
            <p className={cx('subheading')}>I'm a product engineer based in NYC. I'm passionate about building innovative digital products people love.</p>
            <p className={cx('consulting')}>Currently, I split my time between personal & client projects.</p>
            <p className={cx('ellipsis')}>&hellip;</p>
            <p className={cx('links')}>
              <Link to={"/posts"}>blog</Link>&nbsp;&sdot;
              <a href="https://github.com/zamiang">github</a>&nbsp;&sdot;
              <a href="http://twitter.com/zamiang">twitter</a>
            </p>
            <p className={cx('ellipsis')}>&hellip;</p>
          </div>
        </div>
        <div className={cx('section')}>
          <h2 className={cx('caps')}>Projects</h2>
          <div className={cx('small-border')}></div>
          <div className={cx('project')}>
            <h2><a href="http://www.vislet.com">Vislet</a></h2>
            <div className={cx('description')}>
              Small interactive visualizations to help us understand the cities we live in.
            </div>
          </div>
          <div className={cx('project')}>
            <h2><a href="https://artsy.net">Artsy</a></h2>
            <div className={cx('description')}>
              Director of Web Engineering 2011-2014, responsible for making sure Artsy’s public facing web presence is fast and maintainable.
            </div>
          </div>
          <div className={cx('project')}>
            <h2><a href="https://iphone.artsy.net">Flare</a></h2>
            <div className={cx('description')}>
              Artsy iPhone app launch marketing page.
            </div>
          </div>
          <div className={cx('project')}>
            <h2><a href="http://zamiang.github.io/jquery.poplockit">poplockit</a></h2>
            <div className={cx('description')}>
              A jQuery plugin for ‘locking’ short content in place as the user scrolls by longer content.
            </div>
          </div>
          <div className={cx('project')}>
            <h2><a href="http://www.kickstarter.com/projects/zamiang/explore-and-organize-your-data-with-poyozo">Poyozo</a></h2>
            <div className={cx('description')}>
              Poyozo helps you keep track of and understand your life by integrating automatic life-tracking with simple visualizations that you can use every day.
            </div>
          </div>
          <div className={cx('project')}>
            <h2><a href="https://code.google.com/p/list-it/">Atomate</a></h2>
            <div className={cx('description')}>
              Context-sensitive automation using heterogeneous information sources on the web.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
