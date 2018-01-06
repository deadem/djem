import { createStore } from 'redux';
import reducers from '../reducers';

export interface State {
  login: {
    authorized: boolean;
  };
}

let initialState: State = {
  login: {
    authorized: true,
  }
};

export let store = createStore(reducers, initialState);

// setInterval(() => {
//   store.dispatch({
//     type: 'authorize'
//   });
// }, 1000);
