import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
import reducer from '../reducer';

const logger = createLogger({
  predicate: () => ({ logger: console, diff: true })
});

const store = createStore(reducer, compose(
  applyMiddleware(thunk, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;