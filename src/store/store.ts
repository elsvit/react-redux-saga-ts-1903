import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import auth, { AuthStateT } from './auth';
import common, { CommonStateT } from './common';
import restaurants, { RestaurantsStateT } from './restaurants';
import sagas from './sagas';

export interface IAppState {
  auth: AuthStateT;
  common: CommonStateT;
  restaurants: RestaurantsStateT;
}

const envPublicUrl = process.env.PUBLIC_URL || '';
const basename = envPublicUrl.endsWith('/') ? envPublicUrl : `${envPublicUrl}/`;
const history = createBrowserHistory({ basename }) as History;

const reducers = combineReducers<IAppState & { router: RouterState }>({
  auth,
  common,
  restaurants,
  router: connectRouter(history),
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagas.forEach((saga: any) => sagaMiddleware.run(saga));

export { store, history };
