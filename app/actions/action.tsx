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
}

export interface Action<T> {
  type: string;
  payload: T;
  error?: boolean;
  meta?: any;
}

export interface Article {
  title: string;
}
