import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import {
  createLogger
} from 'redux-logger';
import RoutingReducer from './reducers/RoutingReducer.js';
import thunk from 'redux-thunk';

function saveToSessionStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromSessionStorage() {
  try {
    const serializedState = sessionStorage.getItem('reduxState');
    if (serializedState) {
      return JSON.parse(serializedState);
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const logger = createLogger({
  timestamp: true
});

const Reducers = combineReducers({
  RoutingREDUCER: RoutingReducer
})

const persistedState = loadFromSessionStorage();

let middlewares;

if (process.env.enviroment === 'DEV_START' || process.env.enviroment === 'DEV') {
  middlewares = applyMiddleware(logger, thunk);
} else {
  middlewares = applyMiddleware(thunk);
}
/* mathReducer =mathReducer  se queste due variabili hanno lo stesso nome ES6 permette di evitare di scrivere ciò mathReducer =mathReducer*/
const store = createStore(Reducers, persistedState, middlewares);

store.subscribe(() => {
  saveToSessionStorage(store.getState());
})

export default store;