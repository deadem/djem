import ReactObj from 'react';
import ReactDOMObj from 'react-dom';

declare global {
  var React: typeof ReactObj;
  var ReactDOM: typeof ReactDOMObj;
}
