import { getPostsQuery } from './graphql/types';

export interface IThunkAction {
  type: string;
  promise?: any;
  error?: boolean;
  meta?: any;
}

export interface IThunkResponse {
  type: string;
  res: { data: { data: getPostsQuery } };
  error?: string;
  data?: any;
}

export interface IAction<T> {
  type: string;
  payload: T;
  error?: boolean;
  meta?: any;
}

export interface INavigationAction {
  visible: boolean;
}
