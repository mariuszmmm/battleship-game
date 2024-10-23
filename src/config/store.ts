import {configureStore} from "@reduxjs/toolkit";
import shipGameReducer from "../features/shipGame/shipGameSlice";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		shipGame: shipGameReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;