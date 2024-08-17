import {all} from "redux-saga/effects";
import {exampleSaga} from "../features/example1/exampleSaga";
// import {playSaga} from "../features/play/playSaga.jsx";


export default function* rootSaga() {
	yield all([
		exampleSaga(),
		// playSaga()
	]);
}
