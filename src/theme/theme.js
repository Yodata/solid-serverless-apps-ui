import { createMuiTheme } from '@material-ui/core';

// A theme with custom primary and secondary color.
// It's optional.

const theme = createMuiTheme({
  palette: {
    error: {
      main: '#d32f2f'
    },
    update: {
      main: '#1976d2'
    },
    success: {
      main: '#4caf50'
    },
    new: {
      main: '#ffe499'
    },
    adminButtons: {
      main: '#b6d7a7'
    },
    invisible: {
      main: '#b6b6b6'
    }
  }
});

export default theme;