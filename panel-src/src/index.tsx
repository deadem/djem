import { Provider } from 'react-redux';
import { Store } from './store';

import Main from './components/Main';

let loader: HTMLElement = document.getElementById('container-loader') as HTMLElement;
let parent = loader.parentNode;
if (parent) {
  parent.removeChild(loader);
}

ReactDOM.render(
  <Provider store={Store.get()}>
    <Main />
  </Provider>
  ,
  document.getElementById('app')
);
