import { State, store } from '../store';

interface Reducer {
  type: any;
  id?: string | number;
  state?: any;
}

export class Action {
  public static authorize(obj: {}) {
    return this.dispatch((state, _action) => { state.login.authorized = !state.login.authorized; }, obj);
  }

  public static grid(obj: {}) {
    return this.dispatch((state, action) => { state.grid.data = action.state; }, obj);
  }

  public static gridChange(obj: {}) {
    return this.dispatch((state, action) => { state.grid.id = action.id; }, obj);
  }

  public static tabChange(obj: {}) {
    return this.dispatch((_state, action) => ({ tab: action.id }), obj);
  }

  public static tree(obj: {}) {
    return this.dispatch((_state, action) => ({ tree: [ ...action.state ] }), obj);
  }

  private static dispatch(type: (state: State, action: Reducer) => {} | void, obj: {}) {
    store.dispatch({ ...obj, type });
  }
}

export default (state: State, action: Reducer): State => {
  if (typeof action.type == 'function') {
    let clone = { ...state };
    return { ...state, ...(action.type(clone, action) || clone) };
  }

  return state;
};
