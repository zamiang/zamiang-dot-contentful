import {
  GET_SITE_DATA_REQUEST,
  GET_SITE_DATA_SUCCESS,
  GET_SITE_DATA_FAILURE
} from '../types';
import { ThunkResponse } from '../actions/action';

interface State {
  title: string;
  searchDescription: string;
  fetched: boolean;
  isLoading: boolean;
}

const initialState: State = {
  title: '',
  searchDescription: '',
  fetched: false,
  isLoading: true,
};

export default function siteData(state = initialState, action: ThunkResponse) {
  switch (action.type) {
    case GET_SITE_DATA_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        fetched: false
      });
    case GET_SITE_DATA_SUCCESS:
      return Object.assign({}, state, action.res.data)
    case GET_SITE_DATA_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });
    default:
      return state;
  }
}
