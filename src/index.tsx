import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import ScrollTop from './components/scrollTop/ScrollTop';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <BrowserRouter>
  <ScrollTop />
   <App />
  </BrowserRouter>
  </Provider>

);

