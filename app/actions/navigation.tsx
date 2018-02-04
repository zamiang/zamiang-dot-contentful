import { IAction, INavigationAction } from '../interfaces';
import * as types from '../types';

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
