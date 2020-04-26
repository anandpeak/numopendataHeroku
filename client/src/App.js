import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../src/components/Layout/Header';
import Structure from './components/pages/structure/Structure';
import Footer from '../src/components/Layout/Footer';
import Department from './components/pages/structure/department/Department';
import Lesson from './components/pages/lessons/MainSelection';
import Enrollment from './components/pages/enrollment/Enrollment';
import Home from './components/pages/home/Home';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <div className="mainContainer">
          <Header />

          <div className="App">
            <Switch>
              <Route path="/" component={Home} exact></Route>
              <Route path="/struct" component={Structure} exact></Route>
              <Route
                path="/struct/departments"
                component={Department}
                exact
              ></Route>
              <Route
                path="/struct/departments/:id"
                component={Department}
              ></Route>
              <Route path="/lesson" component={Lesson}></Route>
              <Route path="/enrollment" component={Enrollment}></Route>
            </Switch>
            <Footer />
          </div>

          {/* <Footer /> */}
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
