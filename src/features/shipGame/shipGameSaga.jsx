import {takeLatest, select, call, put} from "redux-saga/effects";
import {
	selectParameters,
	selectBoard,
	setBoard,
	shipSelect,
	setFleet,
	selectSelectedShip,
	setChangeShipPlace,
	setWarning, selectMayTouch, changesShips, setIsWarning
} from "./shipGameSlice.jsx";
import {buildShips} from "./ChangeShips/buildShips.jsx"
import {setSelectedShip} from "./ChangeShips/setSelectedShip.jsx";
import {getFleet} from "./ChangeShips/getFleet.jsx";
import {boardSchemat} from "./ChangeShips/boardSchemat.jsx";
import {moveShip} from "./ChangeShips/moveShip.jsx";

function* changesShipsHandler() {
	const parameters = yield select(selectParameters);
	const board = yield call(boardSchemat);
	const fleet = yield call(getFleet, parameters.numberOfShips);
	yield put(setFleet(fleet));
	const newBoard = yield call(buildShips, {board, parameters, fleet});
	yield put(setBoard(newBoard));
}

function* shipSelectHandler({payload: {boardWithMoved, movedShip, isWarning}}) {
	const defaultBoard = yield select(selectBoard);
	const selectedShip = yield select(selectSelectedShip);
	const board = boardWithMoved || defaultBoard;
	const ship = movedShip || selectedShip;
	const {boardWithSelected, warning} = yield call(setSelectedShip, {board, ship,isWarning});
	yield put(setWarning(warning))
	yield put(setIsWarning(isWarning))
	yield put(setBoard(boardWithMoved || boardWithSelected));
}

function* setChangeShipPlaceHandler({payload: change}) {
	const board = yield select(selectBoard);
	const mayTouch = yield select(selectMayTouch);
	const {selectedShip, movedShip, boardWithMoved, isWarning} = yield call(moveShip, {board, change, mayTouch});
	yield put(shipSelect({board, selectedShip, movedShip, boardWithMoved, isWarning}))
}

export function* shipGameSaga() {
	yield takeLatest(changesShips.type, changesShipsHandler);
	yield takeLatest(shipSelect.type, shipSelectHandler);
	yield takeLatest(setChangeShipPlace.type, setChangeShipPlaceHandler);
}

