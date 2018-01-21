import { createStore } from 'redux';
import reducers from '../reducers';
import { State, initialState } from './store';

export type State = State;
export let store = createStore(reducers, initialState);
export type Store = typeof store;
