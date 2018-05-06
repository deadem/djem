export { State } from './State';
export { default as Proxy } from './Proxy';

import { Store as StoreClass } from './Store';
import { Actions } from './actions';

export let Store = new StoreClass();
export let Action = new Actions(Store);
