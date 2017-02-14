export interface ThunkAction {
  type: string;
  promise?: any;
  error?: boolean;
  meta?: any;
}

export interface ThunkResponse {
  type: string;
  res: any;
  error?: string;
  data?: any;
}

export interface Action<T> {
  type: string;
  payload: T;
  error?: boolean;
  meta?: any;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  body: string;
  date: string;
}
