import {takeLatest, select, call, put} from "redux-saga/effects";
import {selectBoard, setStateNewGame, setBoard} from "./playSlice.jsx";
import {buildShips} from "./Play/buildShips.jsx"

function* actionHandler() {

	const board = yield select(selectBoard);
	const newBoard = yield call(buildShips, board);
	yield put(setBoard(newBoard));
}

export function* playSaga() {
	yield takeLatest(setStateNewGame.type, actionHandler);
}
