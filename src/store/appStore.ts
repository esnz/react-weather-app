import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appReducer, IAppState } from './reducers/appReducer';
import { IWeatherState, weatherReducer } from './reducers/weatherReducer';

const rootReducer = combineReducers({
  app: appReducer,
  weather: weatherReducer,
});

export type AppStore = {
  app: IAppState;
  weather: IWeatherState;
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
