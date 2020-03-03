import { createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

// A theme with custom primary and secondary color.
// It's optional.

const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[100],
      main: grey[200],
      dark: grey[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  }
});

export default theme;