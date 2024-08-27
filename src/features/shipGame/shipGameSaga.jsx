import {takeLatest, select, call, put} from "redux-saga/effects";
import {
	selectParameters,
	selectBoard,
	// setStateNewGame,
	setBoard,
	shipSelect,
	setRotateShip,
	setChangeShipsState,
	setHomeState,
	setFleet,
	setFleetOnBoard, selectFleetOnBoard, moveToTop,moveToDown,
	moveToLeft, moveToRight,selectSelectedShip,
	selectMovedShip,
} from "./shipGameSlice.jsx";
import {buildShips} from "./ChangeShips/buildShips.jsx"
import {setSelectedShip} from "./ChangeShips/setSelectedShip.jsx";
import {rotateSelectedShip} from "./ChangeShips/rotateSelectedShip.jsx";
import {getFleet} from "./ChangeShips/getFleet.jsx";
import {boardSchemat} from "./ChangeShips/boardSchemat.jsx";
import {moveShip} from "./ChangeShips/moveShip.jsx";

function* setChangeShipsHandler() {
	const parameters = yield select(selectParameters);
	const board = yield call(boardSchemat);
	const fleet = yield call(getFleet, parameters.numberOfShips);
	yield put(setFleet(fleet));
	const {newBoard, fleetOnBoard} = yield call(buildShips, {board, parameters, fleet});
	yield put(setFleetOnBoard(fleetOnBoard));
	yield put(setBoard(newBoard));
}

function* shipSelectHandler() {
	const board = yield select(selectBoard);
	const selectedShip = yield select(selectSelectedShip);
	const boardWithSelected = yield call(setSelectedShip, {board, selectedShip});
	yield put(setBoard(boardWithSelected));
}

function* moveToTopHandler({payload: selectedShip}) {
	const board = yield select(selectBoard);
	// const selectedShip = yield select(selectSelectedShip);
	const movedShip = yield select(selectMovedShip);
	const boardWithMoved = yield call(moveShip, {board, selectedShip, movedShip});
	// shipSelect({board, cell, selectedShip})
	// yield put(setSelectedShip(movedShip));
	yield put(setBoard(boardWithMoved));
}

function* rotateShipHandler() {
	const board = yield select(selectBoard);
	const selected = yield select(selectSelectedShip());

	// const newStep = {1: 2, 2: 3, 3: 4, 4: 1};
	const boardWithShipRotated = yield call(rotateSelectedShip, {board, selected});
	// yield put(setBoard(boardWithShipRotated));
}

export function* shipGameSaga() {
	yield takeLatest(setChangeShipsState.type, setChangeShipsHandler);
	// yield takeLatest(setSettingsState.type, settingsHandler);
	yield takeLatest(shipSelect.type, shipSelectHandler);
	yield takeLatest(moveToTop.type, moveToTopHandler);
	yield takeLatest(moveToDown.type, moveToTopHandler);
	yield takeLatest(moveToLeft.type, moveToTopHandler);
	yield takeLatest(moveToRight.type, moveToTopHandler);


	// yield takeLatest(setRotateShip.type, rotateShipHandler);
}