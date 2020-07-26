import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    error: {
      main: '#d9000e'
    },
    update: {
      main: '#1976d2'
    },
    success: {
      main: '#618959'
    },
    new: {
      main: '#ffe499'
    },
    adminButtons: {
      main: '#618959'
    },
    invisible: {
      main: '#e6e6e6'
    },
    purple: {
      main: '#552448'
    },
    white: {
      main: '#ffffff'
    },
    black: {
      main: '#000000'
    }
  },
  typography: {
    fontFamily: [
      'ProximaNova',
      'Roboto'
    ].join(','),
    body2: {
      fontSize: 16.2
    },
    body1: {
      fontSize: 17.7,
      fontFamily: [
        'ProximaNovaBold',
        'Roboto'
      ].join(',')
    },
    vendorName: {
      fontSize: 21.1,
      fontFamily: [
        'ProximaNovaBold',
        'Roboto'
      ].join(',')
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        '&:hover': {
          backgroundColor: 'transparent',
        }
      },
      outlined: {
        borderColor: '#552448',
        color: '#552448'
      }
    }
  }
});

export default theme;