import React from 'react';
import ReactDOM from 'react-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import App from './App';
import {Download, AnalysisView, AnalysisCreate} from './analysis';
import theme from './theme';
import reportWebVitals from './reportWebVitals';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
const HAS_REACT_QUERY = Boolean(
  JSON.parse(process.env.REACT_APP_REACT_QUERY_DEVTOOLS || 'false')
);
const __DEV__ = process.env.NODE_ENV === 'development';
if (__DEV__) {
  const {worker} = require('./mocks/browser');
  worker.start({onUnhandledRequest: 'bypass'});
}

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {HAS_REACT_QUERY && <ReactQueryDevtools />}
      <Router>
        <Switch>
          <Route path="/analysis/download/:fileId">
            <React.StrictMode>
              <Download />
            </React.StrictMode>
          </Route>
          <Route path="/analysis/new">
            <React.StrictMode>
              <AnalysisCreate />
            </React.StrictMode>
          </Route>
          <Route path="/analysis/:id">
            <React.StrictMode>
              <AnalysisView />
            </React.StrictMode>
          </Route>
          <Route path="/">
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
