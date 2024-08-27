import {takeLatest, select, call, put} from "redux-saga/effects";
import {
	selectParameters,
	selectBoard,
	setBoard,
	shipSelect,
	setChangeShipsState,
	setFleet,
	setFleetOnBoard,
	selectSelectedShip,
	setChangeShipPlace
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

function* setChangeShipPlaceHandler({payload: change}) {
	const board = yield select(selectBoard);
	const {selectedShip, movedShip, boardWithMoved} = yield call(moveShip, {board, change});
	yield put(shipSelect({board, selectedShip, movedShip}))
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
	yield takeLatest(setChangeShipPlace.type, setChangeShipPlaceHandler);
	// yield takeLatest(setRotateShip.type, rotateShipHandler);
}