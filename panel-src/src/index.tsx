import { Provider } from 'react-redux';
import { store } from './store';

import Main from './components/Main';

let loader: HTMLElement = document.getElementById('container-loader') as HTMLElement;
let parent = loader.parentNode;
if (parent) {
  parent.removeChild(loader);
}

ReactDOM.render(
  <Provider store={store}>
    <Main content='grid' />
  </Provider>
  ,
  document.getElementById('app')
);
