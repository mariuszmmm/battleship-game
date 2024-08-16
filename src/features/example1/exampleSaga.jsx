import { takeLatest, select, put } from "redux-saga/effects";
import { setCounter, setDescription, selectCounter } from "./exampleSlice";

function* exapleActionHandler() {
    const counter = yield select(selectCounter);
    if (counter > 0) yield put(setDescription("larger than zero"));
    if (counter < 0) yield put(setDescription("smaller than zero"));
    if (counter === 0) yield put(setDescription("is zero"));
}

export function* exampleSaga() {
    yield takeLatest(setCounter.type, exapleActionHandler);
}
