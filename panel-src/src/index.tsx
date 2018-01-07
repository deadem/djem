import { Provider } from 'react-redux';
import { store } from './store';

import Main from "./components/Main";

let loader: HTMLElement = document.getElementById('container-loader') as HTMLElement;
let parent = loader.parentNode;
parent && parent.removeChild(loader);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>
  ,
  document.getElementById('app')
);

// import { Proxy } from './store/Proxy';
// new Proxy().instance().post('tree', {});
