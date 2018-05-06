import { Store } from '../Store';

export class Actions {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  public authorize(authorized: boolean) {
    return this.store.dispatch(state => ({ ...state, login: { ...state.login, authorized } }));
  }

  public gridChange(id: string | number) {
    return this.store.dispatch(state => ({ ...state, grid: { ...state.grid, id } }));
  }

  public openContent(params: { doctype: string; id: string | number; name: string }) {
    return this.store.dispatch(state => {
      let id = `${params.doctype}--${params.id}`;

      let tabs = [ ...state.tabs ];
      if (!tabs.reduce((prev, item) => (prev || item.id == id), false)) {
        tabs.push({ name: params.name, id });
      }

      return { ...state, content: { ...state.content, [id]: { params, data: {} } }, tab: id, tabs };
    });
  }

  public tabChange(tab: string | number) {
    return this.store.dispatch(state => ({ ...state, tab }));
  }

  // load data
  public grid(data: any) {
    return this.store.dispatch(state => ({ ...state, grid: { ...state.grid, data } }));
  }

  public tree(tree: { refs: {}; data: any[] }) {
    return this.store.dispatch(state => ({ ...state, tree }));
  }

  public content(id: string, data: object) {
    return this.store.dispatch(state => ({ ...state, content: { ...state.content, [id]: { ...state.content[id], data } } }));
  }
}
