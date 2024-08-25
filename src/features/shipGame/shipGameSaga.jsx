import {takeLatest, select, call, put} from "redux-saga/effects";
import {
	selectParameters,
	selectBoard,
	// setStateNewGame,
	setBoard,
	setItemSelect,
	setRotateShip, selectSelected,
	setChangeShipsState,
	setHomeState,
	setFleet,
	setFleetOnBoard, selectFleetOnBoard,
} from "./shipGameSlice.jsx";
import {buildShips} from "./ChangeShips/buildShips.jsx"
import {setShipSelect} from "./ChangeShips/setShipSelect.jsx";
import {rotateSelectedShip} from "./ChangeShips/rotateSelectedShip.jsx";
import {setSettingsState} from "./shipGameSlice.jsx";
import {getFleet} from "./ChangeShips/getFleet.jsx";
import {boardSchemat} from "./ChangeShips/boardSchemat.jsx";

function* changeShipsHandler() {
	const parameters = yield select(selectParameters);
	const board = yield call(boardSchemat);
	const fleet = yield call(getFleet, parameters.numberOfShips);
	yield put(setFleet(fleet));
	const {newBoard, fleetOnBoard} = yield call(buildShips, {board, parameters, fleet});
	yield put(setFleetOnBoard(fleetOnBoard));
	yield put(setBoard(newBoard));
}

function* itemSelectHandler({payload: cell}) {
	const board = yield select(selectBoard);
	const fleetOnBoard = yield select(selectFleetOnBoard);
	const boardWithSelected = yield call(setShipSelect, {board, fleetOnBoard});
	console.log(boardWithSelected)

	yield put(setBoard(boardWithSelected));
}

function* rotateShipHandler() {
	const board = yield select(selectBoard);
	const selected = yield select(selectSelected());

	// const newStep = {1: 2, 2: 3, 3: 4, 4: 1};
	const boardWithShipRotated = yield call(rotateSelectedShip, {board, selected});
	// yield put(setBoard(boardWithShipRotated));
}

export function* shipGameSaga() {
	yield takeLatest(setChangeShipsState.type, changeShipsHandler);
	// yield takeLatest(setSettingsState.type, settingsHandler);
	yield takeLatest(setItemSelect.type, itemSelectHandler);
	// yield takeLatest(setRotateShip.type, rotateShipHandler);
}