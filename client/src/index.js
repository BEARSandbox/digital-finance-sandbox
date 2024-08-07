import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Root from './root';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

// utility components
import ScrollToTop from './shared/ScrollToTop/ScrollToTop';

const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
  },
  palette: {
    secondary: {
      light: '#2d315d',
      main: '#2d315d',
      dark: '#2d315d',
      contrastText: '#ffffff',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Root />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
