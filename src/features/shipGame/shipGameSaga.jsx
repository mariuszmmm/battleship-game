import {takeLatest, select, call, put} from "redux-saga/effects";
import {
	selectParameters,
	selectFirstPlayerBoard,
	selectSelectedShip,
	selectMayTouch,
	setBoardForFirstPlayer,
	setShips,
	setShipSelectedNumber,
	setChangeShipPlace,
	setSelectedShip,
	setLockedMoves,
	setWrongSettingOfShips,
	setApprovedSetting,
	setTarget,
	setBoardForFirstPlayersShots,
	setBoardForComputersShots,
	setBoardForComputer,
	setShot,
	selectFirstPlayerShot,
	selectFirstPlayerBoardToShots,
	selectComputerBoard,
	selectComputerShot,
	selectComputerBoardToShots,
	setNumberOfShots, selectFirstPlayerNumberOfShots, selectComputerNumberOfShots
} from "./shipGameSlice.jsx";
import {addRandomShips} from "./SetShips/addRandomShips.jsx"
import {changeSelectedShip} from "./SetShips/changeSelectedShip.jsx";
import {getShips} from "./SetShips/getShips.jsx";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";
import {moveShip} from "./SetShips/moveShip.jsx";
import {getFleet} from "./SetShips/getFleet";
import {getTarget} from "./PlayGame/getTarget.jsx";
import {getShot} from "./PlayGame/getShot.jsx";

function* setShipsHandler() {
	const {mayTouch, numberOfShips} = yield select(selectParameters);
	const board = yield call(boardSchemat);

	const playersShips = yield call(getShips, numberOfShips);
	const playersNewBoard = yield call(addRandomShips, {board, mayTouch, ships: playersShips});
	const playersFleet = yield call(getFleet, {board: playersNewBoard})
	// yield put(setFleet({fleet: playersFleet}))
	yield put(setApprovedSetting(true))
	yield put(setBoardForFirstPlayer(playersNewBoard));

	const computersShips = yield call(getShips, numberOfShips);
	const computersNewBoard = yield call(addRandomShips, {board, mayTouch, ships: computersShips});
	const computersFleet = yield call(getFleet, {board: computersNewBoard})
	// yield put(setFleet({fleet: computersFleet}))
	// yield put(setApprovedSetting(true))
	yield put(setBoardForComputer(computersNewBoard));

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
	yield put(setBoardForFirstPlayer(boardWithSelected));
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
	yield put(setBoardForFirstPlayer(boardWithMoved));
}

function* setTargetHandler({payload: {target, boardToShots, player, activePlayer}}) {
	if (player !== activePlayer) return;
	const newBoard = yield call(getTarget, {target, boardToShots})
	if (activePlayer === "firstPlayer")
		yield put(setBoardForFirstPlayersShots(newBoard));
	if (activePlayer === "computer")
		yield put(setBoardForComputersShots(newBoard));
}

function* setShotHandler({payload: {numberOfShots, activePlayer}}) {
	const selectShot = () => {
		if (activePlayer === "firstPlayer") return selectFirstPlayerShot;
		if (activePlayer === "computer") return selectComputerShot;
	};
	const selectBoard = () => {
		if (activePlayer === "firstPlayer") return selectComputerBoard;
		if (activePlayer === "computer") return selectFirstPlayerBoard;
	};
	const selectBoardToShots = () => {
		if (activePlayer === "firstPlayer") return selectFirstPlayerBoardToShots;
		if (activePlayer === "computer") return selectComputerBoardToShots;
	};
	const shot = yield select(selectShot())
	const board = yield select(selectBoard())
	const boardToShots = yield select(selectBoardToShots())
	const {boardToShotsAfterShot, boardAfterShot} = yield call(getShot, {boardToShots, board, shot})

	if (activePlayer === "firstPlayer") {
		yield put(setBoardForFirstPlayersShots(boardToShotsAfterShot));
		yield put(setBoardForComputer(boardAfterShot));
	}

	if (activePlayer === "computer") {
		yield put(setBoardForComputersShots(boardToShotsAfterShot));
		yield put(setBoardForFirstPlayer(boardAfterShot));
	}

	yield put(setNumberOfShots(activePlayer))
}

export function* shipGameSaga() {
	yield takeLatest(setShips.type, setShipsHandler);
	yield takeLatest(setShipSelectedNumber.type, setShipSelectedNumberHandler);
	yield takeLatest(setChangeShipPlace.type, setChangeShipPlaceHandler);
	yield takeLatest(setTarget.type, setTargetHandler);
	yield takeLatest(setShot.type, setShotHandler);
}