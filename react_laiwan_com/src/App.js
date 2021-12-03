import React from 'react';
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import H5Tutorial from './page/h5-tutorial/controller/H5Tutorial';
import HomeScreen from './page/home/controller/HomeScreen';
import Tutorial from './Tutorial';

const App = () => (
    <Router>
        <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/h5-tutorial" component={H5Tutorial} />
            <Route path="/tutorial" component={Tutorial} />
            <Redirect to="/" />
        </Switch>
    </Router>
);

export default App;
