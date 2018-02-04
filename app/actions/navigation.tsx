import * as types from '../types';
import { IAction, INavigationAction } from '../interfaces';

export function hideNavigation(): IAction<INavigationAction> {
  return {
    type: types.NAVIGATION_HIDE,
    payload: {
      visible: false,
    },
  };
}

export function showNavigation(): IAction<INavigationAction> {
  return {
    type: types.NAVIGATION_SHOW,
    payload: {
      visible: true,
    },
  };
}
