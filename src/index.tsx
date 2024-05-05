import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import ScrollTop from './components/ScrollTop/ScrollTop';

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

