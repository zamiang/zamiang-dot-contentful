import {
  NAVIGATION_HIDE,
  NAVIGATION_SHOW,
} from "../types";
import { IAction, INavigationAction } from "../interfaces";

interface IState {
  visible: boolean;
}

const initialState: IState = {
  visible: false,
};

export default function navigation(state = initialState, action: IAction<INavigationAction>) {
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
}
