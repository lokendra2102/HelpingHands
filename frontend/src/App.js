import React, { createContext, useState, useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './pages/About.js';
import InstitutionsList from './pages/InstitutionsList.js';
import Institution from './pages/Institution';
import InstitutionProfile from './pages/InstitutionProfile';
import SignIn from './pages/Signin';

import { userContext } from './userContext';
import SignOut from './pages/Signout';
import UserProfile from './pages/UserProfile';

function App() {
  const [user, setUser] = useState('');
  const value = useMemo(
    () => ({ user, setUser }),
    [user]
  );
  // usage of the useContext and createContext react functions to keep the user's state
  return (
    <Router>
      <userContext.Provider value={value}>
        <Navbar />
        <Switch>
          <Route path='/' exact component={SignIn} />
          <Route path='/about' component={About} />
          <Route path='/institutions' component={InstitutionsList} />
          <Route path='/signout' component={SignOut} />
          <Route path='/signin' component={SignIn} />
          <Route path='/userProfile/:id' component={UserProfile} />
          <Route path={`/institution/:id`} exact component={Institution} />
          <Route path={`/institutionProfile/:id`} exact component={InstitutionProfile} />
        </Switch>
      </userContext.Provider>
    </Router>
  );
}

export default App;