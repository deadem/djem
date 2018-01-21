import { State } from '../store';

export enum Reducer {
  Authorize,
  Tree,
  GridChange,
  Grid,
}

interface Action {
  type: Reducer;
  id?: string | number;
  state?: any;
}

const reducers = (state: State, action: Action): State => {
  switch (action.type) {
  case Reducer.Authorize:
    return { ...state, login: { ...state.login, authorized: !state.login.authorized } };
  case Reducer.Tree:
    return { ...state, tree: [ ...action.state ] };
  case Reducer.GridChange:
    return { ...state, grid: { ...state.grid, id: action.id } };
  case Reducer.Grid:
    return { ...state, grid: { ...state.grid, data: action.state } };
  default:
    return state;
  }
};

export default reducers;
