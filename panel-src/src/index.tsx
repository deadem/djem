import { Provider } from 'react-redux';
import { store } from './store';

import Login from "./components/Login";

let loader: HTMLElement = document.getElementById('container-loader') as HTMLElement;
let parent = loader.parentNode;
parent && parent.removeChild(loader);

ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>
  ,
  document.getElementById('app')
);

import { Proxy } from './store/Proxy';

new Proxy().instance().post('tree', {});
