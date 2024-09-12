import {takeLatest, select, call, put, delay} from "redux-saga/effects";
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
	setBoardForSecondPlayersShots,
	setBoardForSecondPlayer,
	selectFirstPlayerBoardToShots,
	selectSecondPlayerBoard,
	selectSecondPlayerBoardToShots,
	setNumberOfShots,
	setShot, setActivePlayer, selectFirstPlayerNumberOfShots,
	selectSecondPlayerNumberOfShots, subtractShot,
	selectFirstPlayerShotInCell, selectSecondPlayerShotInCell,
	selectActivePlayer, selectSecondPlayerTarget, selectPlayers,
	setFleetForFirstPlayer, setFleetForSecondPlayer,
	selectFirstPlayerFleet, selectSecondPlayerFleet
} from "./shipGameSlice.jsx";
import {addRandomShips} from "./SetShips/addRandomShips.jsx"
import {changeSelectedShip} from "./SetShips/changeSelectedShip.jsx";
import {getShips} from "./SetShips/getShips.jsx";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";
import {moveShip} from "./SetShips/moveShip.jsx";
import {getTarget} from "./PlayGame/getTarget.jsx";
import {getShot} from "./PlayGame/getShot.jsx";
import {computerChooses} from "./PlayGame/computerChooses.jsx"

function* setShipsHandler() {
	const {mayTouch, numberOfShips} = yield select(selectParameters);
	const board = yield call(boardSchemat);

	const firstPlayersShips = yield call(getShips, numberOfShips);
	const {fleet: firstPlayersFleet, newBoard: firstPlayersNewBoard} = yield call(addRandomShips, {
		board,
		mayTouch,
		ships: firstPlayersShips
	});
	yield put(setApprovedSetting(true))
	yield put(setBoardForFirstPlayer(firstPlayersNewBoard));
	yield put(setFleetForFirstPlayer(firstPlayersFleet))
	const secondPlayersShips = yield call(getShips, numberOfShips);
	const {fleet: secondPlayersFleet, newBoard: secondPlayersNewBoard} = yield call(addRandomShips, {
		board,
		mayTouch,
		ships: secondPlayersShips
	});
	yield put(setBoardForSecondPlayer(secondPlayersNewBoard));
	yield put(setFleetForSecondPlayer(secondPlayersFleet))
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

function* setTargetHandler({payload: {target, player}}) {
	const forActivePlayer = {
		firstPlayer: {
			selectBoardToShots: selectFirstPlayerBoardToShots,
		},
		secondPlayer: {
			selectBoardToShots: selectSecondPlayerBoardToShots,
		},
	};
	const activePlayer = yield select(selectActivePlayer)
	if (player !== activePlayer) return;
	const boardToShots = yield select(forActivePlayer[activePlayer].selectBoardToShots)
	const newBoard = yield call(getTarget, {target, boardToShots})
	if (activePlayer === "firstPlayer")
		yield put(setBoardForFirstPlayersShots(newBoard));
	if (activePlayer === "secondPlayer")
		yield put(setBoardForSecondPlayersShots(newBoard));
}

function* setShotHandler() {
	const forActivePlayer = {
		firstPlayer: {
			selectShotInCell: selectFirstPlayerShotInCell,
			selectBoard: selectSecondPlayerBoard,
			selectBoardToShots: selectFirstPlayerBoardToShots,
			selectNumberOfShots: selectFirstPlayerNumberOfShots,
			selectFleet: selectFirstPlayerFleet,
			changeActivePlayer: "secondPlayer",
		},
		secondPlayer: {
			selectShotInCell: selectSecondPlayerShotInCell,
			selectBoard: selectFirstPlayerBoard,
			selectBoardToShots: selectSecondPlayerBoardToShots,
			selectFleet: selectSecondPlayerFleet,
			selectNumberOfShots: selectSecondPlayerNumberOfShots,
			changeActivePlayer: "firstPlayer"
		},
	};
	const activePlayer = yield select(selectActivePlayer);
	const shotInCell = yield select(forActivePlayer[activePlayer].selectShotInCell)
	const board = yield select(forActivePlayer[activePlayer].selectBoard)
	const boardToShots = yield select(forActivePlayer[activePlayer].selectBoardToShots)
	const fleet = yield select(forActivePlayer[activePlayer].selectFleet)
	const {boardToShotsAfterShot, boardAfterShot,newFleet} = yield call(getShot, {boardToShots, board, shotInCell,fleet})
	yield put(subtractShot());
	const numberOfShots = yield select(forActivePlayer[activePlayer].selectNumberOfShots)

	if (activePlayer === "firstPlayer") {
		yield put(setFleetForFirstPlayer(newFleet))
		yield put(setBoardForFirstPlayersShots(boardToShotsAfterShot));
		yield put(setBoardForSecondPlayer(boardAfterShot));
	}

	if (activePlayer === "secondPlayer") {
		yield put(setFleetForSecondPlayer(newFleet))
		yield put(setBoardForSecondPlayersShots(boardToShotsAfterShot));
		yield put(setBoardForFirstPlayer(boardAfterShot));
	}

	if (numberOfShots <= 0) {
		yield put(setActivePlayer(forActivePlayer[activePlayer].changeActivePlayer));
	}
}

function* setActivePlayerHandler({payload: activePlayer}) {
	yield put(setNumberOfShots());
	const players = yield select(selectPlayers);
	const player1 = "firstPlayer";
	const player2 = "secondPlayer"
	const moveDelay = 200

	if (activePlayer === player1 && players === "compVsComp") {
		const numberOfShots = yield select(selectFirstPlayerNumberOfShots)
		for (let number = numberOfShots; number > 0; number--) {
			const boardToShots = yield select(selectFirstPlayerBoardToShots)
			const target = yield call(computerChooses)
			yield delay(moveDelay)
			yield put(setTarget({target, boardToShots, player: player1}))
			yield delay(moveDelay)
			yield put(setShot({shotInCell: target}))
			yield delay(moveDelay)
		}
	}
	if (activePlayer === player2 && (players === "compVsComp" || players === "compVsPlayer")) {
		const numberOfShots = yield select(selectSecondPlayerNumberOfShots)
		for (let number = numberOfShots; number > 0; number--) {
			const boardToShots = yield select(selectSecondPlayerBoardToShots)
			const target = yield call(computerChooses)
			yield delay(moveDelay)
			yield put(setTarget({target, boardToShots, player: player2}))
			yield delay(moveDelay)
			yield put(setShot({shotInCell: target}))
			yield delay(moveDelay)
		}
	}
}

export function* shipGameSaga() {
	yield takeLatest(setShips.type, setShipsHandler);
	yield takeLatest(setShipSelectedNumber.type, setShipSelectedNumberHandler);
	yield takeLatest(setChangeShipPlace.type, setChangeShipPlaceHandler);
	yield takeLatest(setTarget.type, setTargetHandler);
	yield takeLatest(setShot.type, setShotHandler);
	yield takeLatest(setActivePlayer.type, setActivePlayerHandler);
}