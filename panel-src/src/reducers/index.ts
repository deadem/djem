import { State, store } from '../store';

export class Action {
  public static authorize(obj: {}) {
    return this.dispatch(this.authorize, obj);
  }

  public static grid(obj: {}) {
    return this.dispatch(this.grid, obj);
  }

  public static gridChange(obj: {}) {
    return this.dispatch(this.gridChange, obj);
  }

  public static tabChange(obj: {}) {
    return this.dispatch(this.tabChange, obj);
  }

  public static tree(obj: {}) {
    return this.dispatch(this.tree, obj);
  }

  private static dispatch(type: any, obj: {}) {
    store.dispatch({ ...obj, type });
  }
}

interface ActionInterface {
  type: any;
  id?: string | number;
  state?: any;
}

const reducer = (type: any, func: (state: State) => {} | void) => {
  return (state: State, action: ActionInterface) => {
    if (action.type === type) {
      let clone = { ...state };
      return { ...state, ...(func(clone) || clone) };
    }

    return state;
  };
};

export default (currentState: State, action: ActionInterface): State => {
  const reducers = [
    reducer(Action.authorize, (state) => { state.login.authorized = !state.login.authorized; }),
    reducer(Action.grid, (state) => { state.grid.data = action.state; }),
    reducer(Action.gridChange, (state) => { state.grid.id = action.id; }),
    reducer(Action.tabChange, () => ({ tab: action.id })),
    reducer(Action.tree, () => ({ tree: [ ...action.state ] })),
  ];

  return reducers.reduce((value, func) => func(value, action) || value, currentState);
};
