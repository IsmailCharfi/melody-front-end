import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ScrollTop from 'src/hooks/useScrollTop';
import ThemeProvider from './theme/ThemeProvider';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import store from 'src/store';
import App from 'src/App';
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={6}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <BrowserRouter>
            <ScrollTop />
            <CssBaseline />
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </HelmetProvider>
  </Provider>,
  document.getElementById('root')
);