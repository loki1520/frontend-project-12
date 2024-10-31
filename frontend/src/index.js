import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider as ProviderRoolbar, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import 'react-toastify/dist/ReactToastify.css';
import i18n from './i18n.js';
import store from './slices/store.js';
import App from './App';

const rollbarConfig = {
  accessToken: '23b5ddd6861f4041a48a21f3c5489c95',
  environment: 'testenv',
};

// function TestError() {
//   const a = null;
//   return a.hello();
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProviderRoolbar config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
            <ToastContainer autoClose={8000} pauseOnHover />
            {/* <TestError /> */}
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </ProviderRoolbar>
  </React.StrictMode>,
);
