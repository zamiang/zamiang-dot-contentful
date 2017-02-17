import {
  CHANGE_PAGE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  GET_POST_REQUEST,
} from "../types";
import { IThunkResponse, IPost } from "../interfaces";

export interface IState {
  isLoading: boolean;
  posts: IPost[];
  post: IPost;
  totalPosts: number;
}

const initialState: IState = {
  posts: [],
  post: {
    id: "",
    title: "",
    slug: "",
    body: "",
    date: "",
  },
  totalPosts: 10,
  isLoading: false,
};

const formatPosts = (posts: any) => {
  return posts.map((post) => post.node);
}

export default function post(state = initialState, action: IThunkResponse) {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return Object.assign({}, state, {
        postsFetching: true,
        posts: [],
      });
    case GET_POSTS_SUCCESS:
      return Object.assign({}, state, {
        postsFetching: false,
        posts: formatPosts(action.res.data.data.posts.edges),
        totalPosts: action.res.data.data.posts.pageInfo.total,
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
