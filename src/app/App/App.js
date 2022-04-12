import React, {useEffect} from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../../theme';
import { Router } from 'react-router-dom';
import Routes from '../route';
import { history } from '../../components/Authentication/history';
import queryString from 'query-string'

/**
 * @Component App
 * @Description This component consumes all other components and renders all views.
 */

function App() {

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
