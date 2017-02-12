import * as React from 'react';
import * as Helmet from 'react-helmet';
import { ROOT_URL } from '../types';
import { Article } from '../actions/action';

interface Props {
  article: Article;
}

const ArticleMeta = (props: Props) => {
  const { article } = props;
  const fullTitle = `${article.title} | Brennan Moore`;
  const fullUrl = `${ROOT_URL}/article/TODO`;
  return (
    <Helmet
      title={fullTitle}
      link={[
        { rel: 'canonical', href: fullUrl }
      ]} />);
};

export default ArticleMeta;
