import * as React from 'react';
import { connect } from 'react-redux';
import * as Helmet from 'react-helmet';
import * as marked from 'marked';
import * as moment from 'moment';
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

class Posts extends React.Component<ArticlesProps, any> {

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
    const articlesHtml = articles.map((article: Article) => {
      return (
        <div key={article.id} className={cx('article')}>
          <div className={cx('time')}>{moment(article.date).format('Do MMMM YYYY')}</div>
          <div className={cx('title')}><Link to={`/post/${article.slug}`}>{article.title}</Link></div>
          <div className={cx('small-border')} />
          <div className={cx('body')} dangerouslySetInnerHTML={{ __html: marked(article.body) }} />
          <div className={cx('bottom-gradient')}></div>
          <Link className={cx('more-link')} to={`/post/${article.slug}`}>Read More</Link>
        </div>
      );
    });
    return (
      <div className={cx('articles')}>
        <Helmet
          title={fullTitle}
          link={[
            { rel: 'canonical', href: `${ROOT_URL}/posts` },
          ]}
          meta={[
            { property: 'og:title', content: fullTitle }
          ]} />
        <div className={cx('section')}>
          {articlesHtml}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
