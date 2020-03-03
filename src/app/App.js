import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import Hero from '../views/Hero';
import Group from '../components/Groups';
import AppCard from '../views/AppCard';

/**
 * @Component App
 * @Description This component consumes all other components and renders all views.
 */

function App() {

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Hero />
        <Group />
        <AppCard />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
