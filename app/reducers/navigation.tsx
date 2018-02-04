import { IAction, INavigationAction } from '../interfaces';
import { NAVIGATION_HIDE, NAVIGATION_SHOW } from '../types';

export interface IState {
  visible: boolean;
}

const initialState: IState = {
  visible: false,
};

const navigation = (state = initialState, action: IAction<INavigationAction>) => {
  switch (action.type) {
    case NAVIGATION_SHOW:
      return Object.assign({}, state, {
        visible: true,
      });
    case NAVIGATION_HIDE:
      return Object.assign({}, state, {
        visible: false,
      });
    default:
      return state;
  }
};

export default navigation;
