import {
  CHANGE_PAGE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  GET_POST_REQUEST,
} from '../types';
import { ThunkResponse } from '../actions/action';
import { Post } from '../actions/action';

interface State {
  isLoading: boolean;
  posts: Post[];
  post: Post;
  totalPosts: number;
}

const initialState: State = {
  posts: [],
  post: {
    id: '',
    title: '',
    slug: '',
    body: '',
    date: '',
  },
  totalPosts: 10,
  isLoading: false,
};

export default function post(state = initialState, action: ThunkResponse) {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return Object.assign({}, state, {
        postsFetching: true,
        posts: [],
      });
    case GET_POSTS_SUCCESS:
      return Object.assign({}, state, {
        postsFetching: false,
        posts: action.res.data.data.posts,
        totalPosts: action.res.data.total,
      });
    case GET_POSTS_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
      });
    case GET_POST_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        post: {},
      });
    case GET_POST_SUCCESS:
      return Object.assign({}, state, {
        post: action.res.data.data.post,
        isLoading: false,
      });
    case GET_POST_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isLoading: false,
      });

    default:
      return state;
  }
}
