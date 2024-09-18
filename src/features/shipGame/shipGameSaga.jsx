import {takeLatest, select, call, put, delay} from "redux-saga/effects";
import {
	selectParameters,
	selectFirstPlayerBoard,
	selectSelectedShip,
	selectMayTouch,
	setBoardForFirstPlayer,
	setState,
	setShipSelectedNumber,
	setChangeShipPlace,
	setSelectedShip,
	setLockedMoves,
	setWrongSettingOfShips,
	setApprovedSetting,
	setTarget,
	setBoardForPlayerShots,
	setBoardForSecondPlayer,
	selectFirstPlayerBoardToShots,
	selectSecondPlayerBoard,
	selectSecondPlayerBoardToShots,
	setNumberOfShots,
	setShot, setActivePlayer, selectFirstPlayerNumberOfShots,
	selectSecondPlayerNumberOfShots, subtractShot,
	selectFirstPlayerShotInCell, selectSecondPlayerShotInCell,
	selectActivePlayer, selectPlayers,
	setFleetForFirstPlayer, setFleetForSecondPlayer,
	selectFirstPlayerFleet, selectSecondPlayerFleet, selectChangeShipPlace,
	setClearBoard,
	clearAfterSwitchActivePlayer
} from "./shipGameSlice.jsx";
import {addRandomShips} from "./SetShips/addRandomShips.jsx"
import {changeSelectedShip} from "./SetShips/changeSelectedShip.jsx";
import {getShips} from "./SetShips/getShips.jsx";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";
import {moveShip} from "./SetShips/moveShip.jsx";
import {getTarget} from "./PlayGame/getTarget.jsx";
import {getShot} from "./PlayGame/getShot.jsx";
import {computerChooses} from "./PlayGame/computerChooses.jsx"

function* setShipsHandler({payload: currentState}) {
	if (currentState === "home") yield put(setClearBoard());
	if (currentState !== "setShips") return;

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
	yield put(setFleetForFirstPlayer(firstPlayersFleet));

	const secondPlayersShips = yield call(getShips, numberOfShips);
	const {fleet: secondPlayersFleet, newBoard: secondPlayersNewBoard} = yield call(addRandomShips, {
		board,
		mayTouch,
		ships: secondPlayersShips
	});
	yield put(setBoardForSecondPlayer(secondPlayersNewBoard));
	yield put(setFleetForSecondPlayer(secondPlayersFleet))

	const players = yield select(selectPlayers);
	if (players === "compVsComp") yield put(setState("playGame"));
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

function* setChangeShipPlaceHandler() {
	const change = yield select(selectChangeShipPlace);
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
	const activePlayer = yield select(selectActivePlayer)
	if (player !== activePlayer) return;

	const forActivePlayer = {
		firstPlayer: {
			selectBoardToShots: selectFirstPlayerBoardToShots,
		},
		secondPlayer: {
			selectBoardToShots: selectSecondPlayerBoardToShots,
		},
	};

	const boardToShots = yield select(forActivePlayer[activePlayer].selectBoardToShots)
	const newBoard = yield call(getTarget, {target, boardToShots})
	yield put(setBoardForPlayerShots(newBoard));
}

function* setShotHandler() {
	const forActivePlayer = {
		firstPlayer: {
			selectShotInCell: selectFirstPlayerShotInCell,
			selectBoard: selectSecondPlayerBoard,
			selectBoardToShots: selectFirstPlayerBoardToShots,
			selectNumberOfShots: selectFirstPlayerNumberOfShots,
			selectEnemyFleet: selectSecondPlayerFleet,
			changeActivePlayer: "secondPlayer",
		},
		secondPlayer: {
			selectShotInCell: selectSecondPlayerShotInCell,
			selectBoard: selectFirstPlayerBoard,
			selectBoardToShots: selectSecondPlayerBoardToShots,
			selectEnemyFleet: selectFirstPlayerFleet,
			selectNumberOfShots: selectSecondPlayerNumberOfShots,
			changeActivePlayer: "firstPlayer"
		},
	};

	const activePlayer = yield select(selectActivePlayer);
	const shotInCell = yield select(forActivePlayer[activePlayer].selectShotInCell)
	const board = yield select(forActivePlayer[activePlayer].selectBoard)
	const boardToShots = yield select(forActivePlayer[activePlayer].selectBoardToShots)
	const fleet = yield select(forActivePlayer[activePlayer].selectEnemyFleet)
	const {boardToShotsAfterShot, boardAfterShot, newFleet} = yield call(getShot, {
		boardToShots,
		board,
		shotInCell,
		fleet
	});
	yield put(subtractShot());
	const numberOfShots = yield select(forActivePlayer[activePlayer].selectNumberOfShots)
	yield put(setBoardForPlayerShots(boardToShotsAfterShot));

	if (activePlayer === "firstPlayer") {
		yield put(setFleetForSecondPlayer(newFleet))
		yield put(setBoardForSecondPlayer(boardAfterShot));
	}

	if (activePlayer === "secondPlayer") {
		yield put(setFleetForFirstPlayer(newFleet))
		yield put(setBoardForFirstPlayer(boardAfterShot));
	}

	yield delay(1000)
	if (numberOfShots <= 0) {
		yield put(setActivePlayer(forActivePlayer[activePlayer].changeActivePlayer));
		yield put(clearAfterSwitchActivePlayer())
	}
}

function* setActivePlayerHandler({payload: activePlayer}) {
	yield put(setNumberOfShots());
	const players = yield select(selectPlayers);
	const player1 = "firstPlayer";
	const player2 = "secondPlayer"

	if (activePlayer === player1 && players === "compVsComp") {
		const numberOfShots = yield select(selectFirstPlayerNumberOfShots)
		for (let number = numberOfShots; number > 0; number--) {
			const boardToShots = yield select(selectFirstPlayerBoardToShots)
			const target = yield call(computerChooses);
			yield delay(700);
			yield put(setTarget({target, boardToShots, player: player1}))
			yield delay(500);
			yield put(setShot({shotInCell: target}));
		}
	}

	if (activePlayer === player2 && (players === "compVsPlayer" || players === "compVsComp")) {
		const numberOfShots = yield select(selectSecondPlayerNumberOfShots)
		for (let number = numberOfShots; number > 0; number--) {
			const boardToShots = yield select(selectSecondPlayerBoardToShots)
			const target = yield call(computerChooses)
			yield delay(700)
			yield put(setTarget({target, boardToShots, player: player2}))
			yield delay(500);
			yield put(setShot({shotInCell: target}));
		}
	}
}

export function* shipGameSaga() {
	yield takeLatest(setState.type, setShipsHandler);
	yield takeLatest(setShipSelectedNumber.type, setShipSelectedNumberHandler);
	yield takeLatest(setChangeShipPlace.type, setChangeShipPlaceHandler);
	yield takeLatest(setTarget.type, setTargetHandler);
	yield takeLatest(setShot.type, setShotHandler);
	yield takeLatest(setActivePlayer.type, setActivePlayerHandler);
}