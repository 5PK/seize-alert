import { createStore, combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

const appInitialState = {
  heartBeat: false,
};

const SEIZURE_DETECTION = 'SEIZURE_DETECTION';
export const setSeizureDetection = createAction(SEIZURE_DETECTION);

const App = handleActions(
  {
    [SEIZURE_DETECTION]: (state, { payload }) => ({
      ...state,
    }),
  },
  appInitialState,
);

const rootReducer = combineReducers({
  App,
});

const configureStore = () => createStore(rootReducer);
export const store = configureStore();
