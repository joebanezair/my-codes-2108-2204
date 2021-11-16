import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './page/home/controller/HomeScreen';
import Tutorial from './Tutorial';

const App = () => (
    <Router>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/tutorial" component={Tutorial} />
    </Router>
);

export default App;
