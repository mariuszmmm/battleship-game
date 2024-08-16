import { all } from "redux-saga/effects";
import { exampleSaga } from "../features/example1/exampleSaga";

export default function* rootSaga() {
    yield all([exampleSaga()]);
}
