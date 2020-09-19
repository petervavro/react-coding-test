import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PageHome from './components/PageHome';
import Page404 from './components/Page404';
import PageInputComponents from './components/PageInputComponents';
import PageVotingList from './components/PageVotingList';
import PageRegisterForm from './components/PageRegisterForm';
import PageWelcome from './components/PageWelcome';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/peter-vavro/focusable-input" exact component={PageInputComponents} />
            <Route path="/peter-vavro/voting-list/:candidates" exact component={PageVotingList} />
            <Route path="/peter-vavro/register-form" exact component={PageRegisterForm} />
            <Route path="/peter-vavro/welcome" exact component={PageWelcome} />
            <Route path="/" exact component={PageHome} />
            <Route path="*" component={Page404} />
        </Switch>
    </Router>
  );
}

export default App;
