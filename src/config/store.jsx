import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import exampleReducer from "../features/example1/exampleSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        example: exampleReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
