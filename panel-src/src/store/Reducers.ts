import { State, store } from '../store';

type Primitive = number | string | boolean | symbol | null | undefined;
type DeepReadOnly<T> = { readonly [P in keyof T]: T extends Primitive ? T : DeepReadOnly<T[P]> };

export class Action {
  public static authorize(authorized: boolean) {
    return this.dispatch(state => ({ ...state, login: { ...state.login, authorized } }));
  }

  public static gridChange(id: string | number) {
    return this.dispatch(state => ({ ...state, grid: { ...state.grid, id } }));
  }

  public static openContent(params: { doctype: string; id: string | number }) {
    return this.dispatch(state => {
      let id = `${params.doctype}--${params.id}`;
      return { ...state, content: { ...state.content, [id]: { params, data: {} } }, tab: id };
    });
  }

  public static tabChange(tab: string | number) {
    return this.dispatch(state => ({ ...state, tab }));
  }

  // load data
  public static grid(data: any) {
    return this.dispatch(state => ({ ...state, grid: { ...state.grid, data } }));
  }

  public static tree(tree: { refs: {}; data: any[] }) {
    return this.dispatch(state => ({ ...state, tree }));
  }

  public static content(id: string, data: object) {
    return this.dispatch(state => ({ ...state, content: { ...state.content, [id]: { ...state.content[id], data } } }));
  }

  // dispatch helper
  private static dispatch(type: (state: DeepReadOnly<State>) => DeepReadOnly<State>) {
    store.dispatch({ type });
  }
}

export function InitReducers(state: DeepReadOnly<State>, action: { id?: string | number; type: any }): DeepReadOnly<State> {
  if (typeof action.type == 'function') {
    return action.type(state);
  }

  return state;
}
