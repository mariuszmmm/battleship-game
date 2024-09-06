import {takeLatest, select, call, put} from "redux-saga/effects";
import {
	selectParameters,
	selectFirstPlayerBoard,
	selectSelectedShip,
	selectMayTouch,
	setBoard, setShips, setFleet,
	setShipSelectedNumber,
	setChangeShipPlace,
	setSelectedShip, setLockedMoves,
	setWrongSettingOfShips, setApprovedSetting
} from "./shipGameSlice.jsx";
import {addRandomShips} from "./SetShips/addRandomShips.jsx"
import {changeSelectedShip} from "./SetShips/changeSelectedShip.jsx";
import {getShips} from "./SetShips/getShips.jsx";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";
import {moveShip} from "./SetShips/moveShip.jsx";
import {getFleet} from "./SetShips/getFleet";

function* setShipsHandler() {
	const {mayTouch, numberOfShips} = yield select(selectParameters);
	const board = yield call(boardSchemat);
	const ships = yield call(getShips, numberOfShips);
	const newBoard = yield call(addRandomShips, {board, mayTouch, ships});
	const fleet = yield call(getFleet, newBoard)
	yield put(setFleet(fleet))
	yield put(setApprovedSetting(true))
	yield put(setBoard(newBoard));
}

function* setShipSelectedNumberHandler({payload: {number, approvedSetting}}) {
	if (approvedSetting) yield put(setApprovedSetting(approvedSetting));
	const board = yield select(selectFirstPlayerBoard);
	const selectedShip = yield select(selectSelectedShip);
	const {boardWithSelected, newSelectedShip, lockedMoves} = yield call(changeSelectedShip, {
		board,
		number,
		selectedShip,
		approvedSetting
	});
	yield put(setLockedMoves(lockedMoves))
	yield put(setSelectedShip(newSelectedShip))
	yield put(setBoard(boardWithSelected));
}

function* setChangeShipPlaceHandler({payload: change}) {
	yield put(setApprovedSetting(false))
	const board = yield select(selectFirstPlayerBoard);
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