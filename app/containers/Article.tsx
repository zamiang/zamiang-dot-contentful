import * as React from 'react';
import { connect } from 'react-redux';
import { fetchArticle } from '../actions/articles';
import ArticleMeta from '../components/ArticleMeta';
import { Article } from '../actions/action';

const classNames = require('classnames/bind');
const styles = require('../css/components/article.css');
const cx = classNames.bind(styles);

interface ArticleProps extends React.Props<any> {
  article: Article;
  isLoading: boolean;
  params: any;
  fetchArticle: any;
}

function mapStateToProps(state: any) {
  const article = state.article.article || {};
  return {
    article,
    isLoading: state.article.isLoading,
    params: state.params
  };
}

const mapDispatchToProps = { fetchArticle };

class ArticleContainer extends React.Component<ArticleProps, any> {

  static need = [
    fetchArticle,
  ];

  static defaultProps = {
    isLoading: false,
  };

  componentWillReceiveProps(nextProps: ArticleProps) {
    const { params } = this.props;

    // new article navigated to
    // TODO check this
    if (nextProps.params.articleSlug && nextProps.params.articleSlug !== params.articleSlug) {
      this.props.fetchArticle(nextProps.params);
    }
  }

  render() {
    const { article } = this.props;
    return (
      <article className={cx('container')}>
        {article.title}
      </article>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleContainer);
