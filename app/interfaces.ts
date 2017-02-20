export interface IThunkAction {
  type: string;
  promise?: any;
  error?: boolean;
  meta?: any;
}

export interface IThunkResponse {
  type: string;
  res: any;
  error?: string;
  data?: any;
}

export interface IAction<T> {
  type: string;
  payload: T;
  error?: boolean;
  meta?: any;
}

export interface IPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  date: string;
}

export interface INavigationAction { visible: boolean; };
