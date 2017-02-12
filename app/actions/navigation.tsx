import * as types from '../types';
import { Action } from './Action';
export type NAVIGATION_ACTION = { visible: boolean };

export function hideNavigation(): Action<NAVIGATION_ACTION> {
  return {
    type: types.NAVIGATION_HIDE,
    payload: {
      visible: false
    }
  };
}

export function showNavigation(): Action<NAVIGATION_ACTION> {
  return {
    type: types.NAVIGATION_SHOW,
    payload: {
      visible: true
    }
  };
}
