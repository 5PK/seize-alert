import { createStore, combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

// Has to be changed to Seizure Alert if possible.
const appInitialState = {
  heartBeat: false,
};

const SEIZURE_DETECTION = 'SEIZURE_DETECTION';
export const setSeizureDetection = createAction(SEIZURE_DETECTION);

// Handle seizure detection actions.
const App = handleActions(
  {
    [SEIZURE_DETECTION]: (state, { payload }) => ({
      ...state,
    }),
  },
  appInitialState,
);

// Reducers
const rootReducer = combineReducers({
  App,
});

// Create store.
const configureStore = () => createStore(rootReducer);
export const store = configureStore();
