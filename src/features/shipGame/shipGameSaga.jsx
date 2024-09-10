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
	selectFirstPlayerBoardToShots,
	selectComputerBoard,
	selectComputerBoardToShots,
	setNumberOfShots,
	setShot, setActivePlayer, selectFirstPlayerNumberOfShots,
	selectComputerNumberOfShots, subtractShot,
	selectFirstPlayerShotInCell, selectComputerShotInCell,
	selectActivePlayer
} from "./shipGameSlice.jsx";
import {addRandomShips} from "./SetShips/addRandomShips.jsx"
import {changeSelectedShip} from "./SetShips/changeSelectedShip.jsx";
import {getShips} from "./SetShips/getShips.jsx";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";
import {moveShip} from "./SetShips/moveShip.jsx";
import {getTarget} from "./PlayGame/getTarget.jsx";
import {getShot} from "./PlayGame/getShot.jsx";

function* setShipsHandler() {
	const {mayTouch, numberOfShips} = yield select(selectParameters);
	const board = yield call(boardSchemat);

	const playersShips = yield call(getShips, numberOfShips);
	const playersNewBoard = yield call(addRandomShips, {board, mayTouch, ships: playersShips});
	yield put(setApprovedSetting(true))
	yield put(setBoardForFirstPlayer(playersNewBoard));
	const computersShips = yield call(getShips, numberOfShips);
	const computersNewBoard = yield call(addRandomShips, {board, mayTouch, ships: computersShips});
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

function* setTargetHandler({payload: {target, boardToShots, player}}) {
	const activePlayer = yield select(selectActivePlayer)
	if (player !== activePlayer) return;
	const newBoard = yield call(getTarget, {target, boardToShots})
	if (activePlayer === "firstPlayer")
		yield put(setBoardForFirstPlayersShots(newBoard));
	if (activePlayer === "computer")
		yield put(setBoardForComputersShots(newBoard));
}

function* setShotHandler() {
	const forActivePlayer = {
		firstPlayer: {
			selectShotInCell: selectFirstPlayerShotInCell,
			selectBoard: selectComputerBoard,
			selectBoardToShots: selectFirstPlayerBoardToShots,
			selectNumberOfShots: selectFirstPlayerNumberOfShots,
			changeActivePlayer: "computer",
		},
		computer: {
			selectShotInCell: selectComputerShotInCell,
			selectBoard: selectFirstPlayerBoard,
			selectBoardToShots: selectComputerBoardToShots,
			selectNumberOfShots: selectComputerNumberOfShots,
			changeActivePlayer: "firstPlayer"
		},
	};
	const activePlayer = yield select(selectActivePlayer);
	const shotInCell = yield select(forActivePlayer[activePlayer].selectShotInCell)
	const board = yield select(forActivePlayer[activePlayer].selectBoard)
	const boardToShots = yield select(forActivePlayer[activePlayer].selectBoardToShots)
	const {boardToShotsAfterShot, boardAfterShot} = yield call(getShot, {boardToShots, board, shotInCell})
	yield put(subtractShot());
	const numberOfShots = yield select(forActivePlayer[activePlayer].selectNumberOfShots)

	if (numberOfShots <= 0) {
		yield put(setActivePlayer(forActivePlayer[activePlayer].changeActivePlayer));
	}

	if (activePlayer === "firstPlayer") {
		yield put(setBoardForFirstPlayersShots(boardToShotsAfterShot));
		yield put(setBoardForComputer(boardAfterShot));
	}

	if (activePlayer === "computer") {
		yield put(setBoardForComputersShots(boardToShotsAfterShot));
		yield put(setBoardForFirstPlayer(boardAfterShot));
	}
}

function* setActivePlayerHandler() {
	yield put(setNumberOfShots());
}

export function* shipGameSaga() {
	yield takeLatest(setShips.type, setShipsHandler);
	yield takeLatest(setShipSelectedNumber.type, setShipSelectedNumberHandler);
	yield takeLatest(setChangeShipPlace.type, setChangeShipPlaceHandler);
	yield takeLatest(setTarget.type, setTargetHandler);
	yield takeLatest(setShot.type, setShotHandler);
	yield takeLatest(setActivePlayer.type, setActivePlayerHandler);
}