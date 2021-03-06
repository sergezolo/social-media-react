import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'; //!!!CHECK THIS, theme isn't working
import jwtDecode from 'jwt-decode';
import axios from 'axios';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
//Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

const theme = createTheme({
  // palette: {
  //   primary: {
  //     light: '#33c9dc',
  //     main: '#00bcd4',
  //     dark: '#008394',
  //     contrastText: '#fff'
  //   },
  //   secondary: {
  //     light: '#ff6333',
  //     main: '#ff3d00',
  //     dark: '#b22a00',
  //     contrastText: '#fff'
  //   }
  // },
  typography: {useNextVariants: true},
})

const token = localStorage.FBIdToken;
if (token){
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }

}

export class App extends Component {
  render() {
    return (
      <div className="app">
        <ThemeProvider theme={ theme }>
          <Provider store={store}>
            <Router>
              <Navbar></Navbar>
              <div className="container">
                <Switch>
                  <Route exact path="/" component={ home }/>
                  <AuthRoute exact path="/login" component={ login } />
                  <AuthRoute exact path="/signup" component={ signup } />
                  <Route exact path="/users/:handle" component={ user }/>
                  <Route exact path="/users/:handle/scream/:screamId" component={ user }/>
                </Switch>
              </div>
            </Router>
          </Provider>
        </ThemeProvider>
      </div>
    )
  }
}

export default App;