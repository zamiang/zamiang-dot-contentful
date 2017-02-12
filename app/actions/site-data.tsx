import request from 'axios';
import * as types from '../types';
import { ThunkAction } from './action';


export function fetchSiteData(params: any, state: any): ThunkAction {
  if (state.siteData.fetched) {
    return {
      type: types.SITE_DATA_FETCHED,
    };
  }
  return {
    type: types.GET_SITE_DATA,
    promise: request.get('/TODO')
  };
}
