import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'; //!!!CHECK THIS, theme isn't working
import jwtDecode from 'jwt-decode';
//Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {useNextVariants: true},
})

let authenticated;
const token = localStorage.FBIdToken;
if (token){
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true;
  }

}

export class App extends Component {
  render() {
    return (
      <div className="app">
        <ThemeProvider theme={ theme }>
          <Router>
            <Navbar></Navbar>
            <div className="container">
              <Switch>
                <Route exact path="/" component={ home }/>
                <AuthRoute exact path="/login" component={ login } authenticated={authenticated }/>
                <AuthRoute exact path="/signup" component={ signup } authenticated={authenticated }/>
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </div>
    )
  }
}

export default App;