import {takeLatest, select, call, put} from "redux-saga/effects";
import {
	selectParameters,
	selectBoard,
	setBoard,
	setShipSelectedNumber,
	selectSelectedShip,
	setChangeShipPlace,
	selectMayTouch, setShips,
	setSelectedShip, setLockedMoves,
	setWrongSettingOfShips, setApprovedSetting
} from "./shipGameSlice.jsx";
import {addRandomShips} from "./SetShips/addRandomShips.jsx"
import {changeSelectedShip} from "./SetShips/changeSelectedShip.jsx";
import {getFleet} from "./SetShips/getFleet.jsx";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";
import {moveShip} from "./SetShips/moveShip.jsx";

function* setShipsHandler() {
	const {mayTouch, numberOfShips} = yield select(selectParameters);
	const board = yield call(boardSchemat);
	const fleet = yield call(getFleet, numberOfShips);
	const newBoard = yield call(addRandomShips, {board, mayTouch, fleet});
	yield put(setBoard(newBoard));
}

function* setShipSelectedNumberHandler({payload: {number, approvedSetting}}) {
	if (approvedSetting) yield put(setApprovedSetting(approvedSetting));
	const board = yield select(selectBoard);
	const selectedShip = yield select(selectSelectedShip);
	const {boardWithSelected, newSelectedShip, lockedMoves} = yield call(changeSelectedShip, {
		board,
		number,
		selectedShip
	});
	yield put(setLockedMoves(lockedMoves))
	yield put(setSelectedShip(newSelectedShip))
	yield put(setBoard(boardWithSelected));
}

function* setChangeShipPlaceHandler({payload: change}) {
	yield put(setApprovedSetting(false))
	const board = yield select(selectBoard);
	const mayTouch = yield select(selectMayTouch);
	const selectedShip = yield select(selectSelectedShip);
	const {newSelectedShip, boardWithMoved, lockedMoves, wrongSettingOfShips} = yield call(moveShip, {
		board,
		change,
		mayTouch,
		selectedShip
	});
	yield put(setWrongSettingOfShips(wrongSettingOfShips))
	yield put(setLockedMoves(lockedMoves))
	yield put(setSelectedShip(newSelectedShip))
	yield put(setBoard(boardWithMoved));
}

export function* shipGameSaga() {
	yield takeLatest(setShips.type, setShipsHandler);
	yield takeLatest(setShipSelectedNumber.type, setShipSelectedNumberHandler);
	yield takeLatest(setChangeShipPlace.type, setChangeShipPlaceHandler);
}

