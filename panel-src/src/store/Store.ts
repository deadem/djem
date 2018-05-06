import { createStore, Store as StoreInterface } from 'redux';
import { initialState } from './State';
import { State } from '../store';

export class Store {
  private static init(state: DeepReadonlyObject<State>, action: { id?: string | number; type: any }): DeepReadonlyObject<State> {
    if (typeof action.type == 'function') {
      return action.type(state);
    }

    return state;
  }

  private store: StoreInterface<DeepReadonlyObject<State>>;

  constructor() {
    this.store = createStore(Store.init, initialState);
  }

  public get() {
    return this.store;
  }

  // dispatch helper
  public dispatch(type: (state: DeepReadonlyObject<State>) => DeepReadonlyObject<State>) {
    this.store.dispatch({ type });
  }
}
