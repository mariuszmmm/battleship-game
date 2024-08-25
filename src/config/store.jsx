import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import shipGameReducer from "../features/shipGame/shipGameSlice.jsx";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		shipGame: shipGameReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
