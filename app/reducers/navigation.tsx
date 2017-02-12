import {
  NAVIGATION_HIDE,
  NAVIGATION_SHOW,
} from '../types';
import { Action } from '../actions/action';
import { NAVIGATION_ACTION } from '../actions/navigation';

interface State {
  visible: boolean;
}

const initialState: State = {
  visible: false,
};

export default function navigation(state = initialState, action: Action<NAVIGATION_ACTION>) {
  switch (action.type) {
    case NAVIGATION_SHOW:
      return Object.assign({}, state, {
        visible: true
      });
    case NAVIGATION_HIDE:
      return Object.assign({}, state, {
        visible: false
      });
    default:
      return state;
  }
}
