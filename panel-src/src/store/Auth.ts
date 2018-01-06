import { createStore } from 'redux';

interface Action {
  type: string;
  text?: string;
}

function todos(state: any, action: Action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.text ]);
    default:
      return state;
  }
}

let store = createStore(todos, ['Use Redux']);

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
});

console.log(store.getState());
// [ 'Use Redux', 'Read the docs' ]

export default store;
