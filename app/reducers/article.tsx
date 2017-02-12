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

interface State {
  isLoading: boolean;
  articles: Array<Article>;
  article: Article;
}

const initialState: State = {
  articles: [],
  article: {
    title: ''
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
        articles: action.res.data
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
        article: action.res.data,
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
