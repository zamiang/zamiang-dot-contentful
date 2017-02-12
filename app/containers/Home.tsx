import * as React from 'react';
import { connect } from 'react-redux';
import * as Helmet from 'react-helmet';
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
    currentPage: 0
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
    const canonicalUrl = currentPage > 1 ? `${ROOT_URL}/articles/${currentPage}` : ROOT_URL;
    const items = [];

    const fullTitle = 'Brennan Moore';
    return (
      <div className={cx('home')}>
        <Helmet
          title={fullTitle}
          link={[
            { rel: 'canonical', href: canonicalUrl },
          ]}
          meta={[
            { property: 'og:title', content: fullTitle }
          ]} />
        <div className={cx('top-article')}>foo</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
