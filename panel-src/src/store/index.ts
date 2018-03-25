import { createStore } from 'redux';
import reducers from './Reducers';
import { State, initialState } from './Store';

export type State = State;
export let store = createStore(reducers, initialState);
export type Store = typeof store;

export { Action } from './Reducers';
export { default as Proxy } from './Proxy';
