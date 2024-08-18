import {all} from "redux-saga/effects";
import {playSaga} from "../features/play/playSaga";


export default function* rootSaga() {
	yield all([
		playSaga()
	]);
};