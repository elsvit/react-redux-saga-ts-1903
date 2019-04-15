/**
 * @fileOverview Root app component
 */

import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import Main from 'components/scenes/Main';
import Restaurant from 'components/scenes/Restaurant';
import Restaurants from 'components/scenes/Restaurants';
import { IAppState } from 'store';
import './App.scss';

interface IAppProps extends RouteProps {
  isAuthenticated: boolean;
  history: History;
}

class App extends React.Component<IAppProps> {
  public render() {
    const { isAuthenticated } = this.props;

    return (
      <ConnectedRouter history={this.props.history}>
        <div className="App">
          {isAuthenticated ? (
            <Switch>
              <Route exact={true} path="/restaurants" component={Restaurants} />
              <Route exact={true} path="/restaurant/:id" component={Restaurant} />
              <Route path="/" render={() => <Redirect to="/restaurants" />} />
              <Redirect to="/restaurants" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={Main} />
              <Redirect to="/login" />
            </Switch>
          )}
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
