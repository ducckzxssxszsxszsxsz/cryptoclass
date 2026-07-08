import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './store.js';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { Web3Provider } from './context/Web3Context';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <Web3Provider>
        <AuthProvider>
          <App />
          <ToastContainer
            position="top-right"
            theme="dark"
            toastClassName="!bg-kempat !border !border-white/10 !backdrop-blur-xl"
          />
        </AuthProvider>
      </Web3Provider>
    </Provider>
  );
} else {
  console.error('Root element not found');
}
