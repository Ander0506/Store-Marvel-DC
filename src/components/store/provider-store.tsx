import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import App from '../app/App';

const ProviderApp: FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default ProviderApp;
