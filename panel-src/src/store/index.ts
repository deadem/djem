import { createStore } from 'redux';
import reducers from '../reducers';

export let store = createStore(reducers, {
  login: {
    authorized: false,
  }
});

setInterval(() => {
  store.dispatch({
    type: 'authorize'
  });
}, 1000);
