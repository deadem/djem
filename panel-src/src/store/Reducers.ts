import { State, store } from '../store';

export class Action {
  public static authorize(authorized: boolean) {
    return this.dispatch(state => { state.login.authorized = authorized; });
  }

  public static grid(data: any) {
    return this.dispatch(state => { state.grid.data = data; });
  }

  public static gridChange(id: string | number) {
    return this.dispatch(state => { state.grid.id = id; });
  }

  public static openContent(params: { doctype: string; id: string | number }) {
    return this.dispatch(state => {
      let id = `${params.doctype}--${params.id}`;

      state.content[id] = { params, data: {} };
      return { tab: id };
    });
  }

  public static tabChange(tab: string | number) {
    return this.dispatch(() => ({ tab }));
  }

  public static tree(tree: {}) {
    return this.dispatch(() => ({ tree }));
  }

  private static dispatch(type: (state: State) => {} | void) {
    store.dispatch({ type });
  }
}

export function InitReducers(state: State, action: { id?: string | number; type: any }): State {
  if (typeof action.type == 'function') {
    let clone = { ...state };
    return { ...state, ...(action.type(clone) || clone) };
  }

  return state;
}
