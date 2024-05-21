import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { user } from "./user";
import { contacts } from "./contacts";
import { settings } from "./settings";
import { app } from "./app";
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "./rootSaga";
import { save, load } from "redux-localstorage-simple"

const rootReducer = combineReducers({app, user, contacts, settings})

const sagaMiddleware  = createSagaMiddleware()

// Stay logged in using local storage
const PERSISTED_KEYS: string[] = ['user']
const preloadedState = load({
    states: PERSISTED_KEYS,
    disableWarnings: true
})

const store = configureStore({
  reducer: rootReducer,
  middleware:  [sagaMiddleware, save({ states: PERSISTED_KEYS })],
  preloadedState,
  devTools: true
});


sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
