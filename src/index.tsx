import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import ScrollTopPage from './components/ScrollTopPage/ScrollTopPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <BrowserRouter>
  <ScrollTopPage />
   <App />
  </BrowserRouter>
  </Provider>

);

