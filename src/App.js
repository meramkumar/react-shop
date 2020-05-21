import React from 'react';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { Route, Switch } from 'react-router-dom';
import { auth, createUserProfile } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }
  unsubscribeFormAuth = null;

  componentDidMount() {
    // this.unsubscribeFormAuth = auth.onAuthStateChanged(async user => {
    //   createUserProfile(user);
    //   console.log(user);
    // });
    this.unsubscribeFormAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth);
        userRef.onSnapshot(snapShot => { 
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFormAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
