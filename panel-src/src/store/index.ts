import { createStore } from 'redux';
import reducers from '../reducers';

interface Login {
  login: {
    authorized: boolean;
  };
}

interface Tree {
  tree?: any;
}

export type State = Tree & Login;

let initialState: State = {
  login: {
    authorized: true,
  }
};

export let store = createStore(reducers, initialState);
