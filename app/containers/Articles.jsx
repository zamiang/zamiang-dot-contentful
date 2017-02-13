import * as React from 'react';
import { connect } from 'react-redux';
import * as Helmet from 'react-helmet';
import { Link } from 'react-router';
import { ROOT_URL } from '../types';
import { fetchArticles } from '../actions/articles';
import { Article } from '../actions/action';

const classNames = require('classnames/bind');
const styles = require('../css/components/articles.css');
const cx = classNames.bind(styles);

interface Params {
  pageNumber: number;
}

interface ArticlesProps {
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

class Articles extends React.Component<ArticlesProps, any> {

  static defaultProps = {
    currentPage: 0,
  };

  static need = [
    fetchArticles,
  ];

  componentWillReceiveProps(nextProps: ArticlesProps) {
    const { currentPage } = this.props;

    // new page
    if (nextProps.currentPage !== currentPage) {
      this.props.fetchArticles(nextProps);
    }
  }

  render() {
    const { articles, totalArticles, currentPage } = this.props;
    const fullTitle = "Brennan Moore | Posts";
    return (
      <div className={cx('articles')}>
        <Helmet
          title={fullTitle}
          link={[
            { rel: 'canonical', href: `${canonicalUrl}/posts` },
          ]}
          meta={[
            { property: 'og:title', content: ROOT_URL }
          ]} />
        <div className={cx('section')}>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);
