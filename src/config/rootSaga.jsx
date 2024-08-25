import {all} from "redux-saga/effects";
import {shipGameSaga} from "../features/shipGame/shipGameSaga";

export default function* rootSaga() {
	yield all([
		shipGameSaga(),
	]);
};