import React,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/index';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <Suspense>
    <App /> 
    <Toaster
      toastOptions={{
        position : 'top-right',
        style : {
          background : '#568EA6',
          color : 'white'
        }
      }} 
    />
    </Suspense>
    </Provider>
);
const initialLoader = document.getElementById('initial-loader');
if (initialLoader) {
  initialLoader.classList.add('fade-out');
  setTimeout(() => initialLoader.remove(), 400);
}

reportWebVitals();