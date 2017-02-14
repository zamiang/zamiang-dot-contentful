import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_FAILURE,
  GET_ARTICLE_REQUEST,
} from '../types';
import { ThunkResponse } from '../actions/action';
import { Article } from '../actions/action';
import { formatIncludes, formatArticle } from '../helpers/contentful';

function formatArticles(articles: any, includes: any) {
  const formattedIncludes = formatIncludes(includes);
  return articles.map(a => formatArticle(a, formattedIncludes.entryHash, formattedIncludes.assetHash));
}

interface State {
  isLoading: boolean;
  articles: Article[];
  article: Article;
}

const initialState: State = {
  articles: [],
  article: {
    id: '',
    title: '',
    slug: '',
    body: '',
    date: '',
  },
  isLoading: false,
};

export default function article(state = initialState, action: ThunkResponse) {
  switch (action.type) {
    case GET_ARTICLES_REQUEST:
      return Object.assign({}, state, {
        articlesFetching: true,
        articles: []
      });
    case GET_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        articlesFetching: false,
        articles: formatArticles(action.res.data.items, action.res.data.includes),
      });
    case GET_ARTICLES_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
      });

    case GET_ARTICLE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        article: {}
      });
    case GET_ARTICLE_SUCCESS:
      return Object.assign({}, state, {
        article: formatArticles(action.res.data.items, action.res.data.includes)[0],
        isLoading: false,
      });
    case GET_ARTICLE_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isLoading: false,
      });

    default:
      return state;
  }
}
