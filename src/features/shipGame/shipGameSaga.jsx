import {takeLatest, select, call, put, delay} from "redux-saga/effects";
import {
	selectActivePlayer, selectGameMode,
	selectParameters, selectMayTouch, selectDifficultyLevel,
	selectFirstPlayerBoard, selectFirstPlayerBoardToShots,
	selectSecondPlayerBoard, selectSecondPlayerBoardToShots,
	selectFirstPlayerFleet, selectSecondPlayerFleet,
	selectFirstPlayerNumberOfShots, selectSecondPlayerNumberOfShots,
	selectFirstPlayerShotInCell, selectSecondPlayerShotInCell,
	selectSelectedShip, selectChangeShipPlace,
	selectWinner, selectSound, selectState, selectBonus,
	setActivePlayer,
	setBoardForFirstPlayer, setBoardForPlayerShots,
	setBoardForSecondPlayer,
	setFleetForFirstPlayer, setFleetForSecondPlayer,
	setNumberOfShips,
	setSelectedShip, setShipSelectedNumber, setChangeShipPlace,
	setLockedMoves, setWrongSettingOfShips, setApprovedSetting,
	setTarget, setShot, subtractShot, setNumberOfShots,
	clearAfterShot, setShips,
	setWinner,
} from "./shipGameSlice.jsx";
import {addRandomShips} from "./SetShips/addRandomShips.jsx"
import {changeSelectedShip} from "./SetShips/changeSelectedShip.jsx";
import {getShips} from "./SetShips/getShips.jsx";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";
import {moveShip} from "./SetShips/moveShip.jsx";
import {getTarget} from "./PlayGame/getTarget.jsx";
import {getShot} from "./PlayGame/getShot.jsx";
import {computerChooses} from "./PlayGame/computerChooses.jsx"
import {isWinner} from "./PlayGame/isWinner.jsx";
import shotSound from "../../assets/Audio/shot.mp3";
import sunk from "../../assets/Audio/sunk.mp3";
import siren from "../../assets/Audio/siren.mp3";
import hit from "../../assets/Audio/hit.mp3";

function* setShipsHandler() {
	const {mayTouch, numberOfShips} = yield select(selectParameters);
	const board = yield call(boardSchemat);

	const firstPlayersShips = yield call(getShips, numberOfShips);
	const {fleet: firstPlayersFleet, newBoard: firstPlayersNewBoard} =
		yield call(addRandomShips, {board, mayTouch, ships: firstPlayersShips});
	yield put(setBoardForFirstPlayer(firstPlayersNewBoard));
	yield put(setFleetForFirstPlayer(firstPlayersFleet));

	const secondPlayersShips = yield call(getShips, numberOfShips);
	const {fleet: secondPlayersFleet, newBoard: secondPlayersNewBoard} =
		yield call(addRandomShips, {board, mayTouch, ships: secondPlayersShips});
	yield put(setBoardForSecondPlayer(secondPlayersNewBoard));
	yield put(setFleetForSecondPlayer(secondPlayersFleet));
}

function* setShipSelectedNumberHandler({payload: {number, approvedSetting}}) {
	if (approvedSetting) yield put(setApprovedSetting(approvedSetting));
	const board = yield select(selectFirstPlayerBoard);
	const selectedShip = yield select(selectSelectedShip);
	const {boardWithSelected, newSelectedShip, lockedMoves} =
		yield call(changeSelectedShip, {board, number, selectedShip, approvedSetting});
	yield put(setLockedMoves(lockedMoves));
	yield put(setSelectedShip(newSelectedShip));
	yield put(setBoardForFirstPlayer(boardWithSelected));
}

function* setChangeShipPlaceHandler() {
	const change = yield select(selectChangeShipPlace);
	yield put(setApprovedSetting(false));
	const board = yield select(selectFirstPlayerBoard);
	const mayTouch = yield select(selectMayTouch);
	const selectedShip = yield select(selectSelectedShip);
	const {newSelectedShip, boardWithMoved, lockedMoves, wrongSettingOfShips} =
		yield call(moveShip, {board, change, mayTouch, selectedShip});
	yield put(setWrongSettingOfShips(wrongSettingOfShips));
	yield put(setLockedMoves(lockedMoves));
	yield put(setSelectedShip(newSelectedShip));
	yield put(setBoardForFirstPlayer(boardWithMoved));
}

function* setTargetHandler({payload: {target, player}}) {
	const activePlayer = yield select(selectActivePlayer);
	if (player !== activePlayer) return;

	const forActivePlayer = {
		firstPlayer: {
			selectBoardToShots: selectFirstPlayerBoardToShots,
		},
		secondPlayer: {
			selectBoardToShots: selectSecondPlayerBoardToShots,
		},
	};

	const boardToShots = yield select(forActivePlayer[activePlayer].selectBoardToShots);
	const newBoard = yield call(getTarget, {target, boardToShots});
	yield put(setBoardForPlayerShots(newBoard));
}

function* setShotHandler() {
	const gameOver = yield select(selectWinner);
	if (gameOver) return;

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
			changeActivePlayer: "firstPlayer",
		},
	};

	const activePlayer = yield select(selectActivePlayer);
	const shotInCell = yield select(forActivePlayer[activePlayer].selectShotInCell);
	const board = yield select(forActivePlayer[activePlayer].selectBoard);
	const boardToShots = yield select(forActivePlayer[activePlayer].selectBoardToShots);
	const fleet = yield select(forActivePlayer[activePlayer].selectEnemyFleet);
	const mayTouch = yield select(selectMayTouch);
	const {boardToShotsAfterShot, boardAfterShot, newFleet, shipsNumber, isSunkShip, hitShip} =
		yield call(getShot, {boardToShots, board, shotInCell, fleet, mayTouch});
	const sound = yield select(selectSound);
	if (sound) {
		const audio = new Audio(shotSound);
		audio.play();
	}

	yield delay(800);
	yield put(setBoardForPlayerShots(boardToShotsAfterShot));
	yield put(setNumberOfShips(shipsNumber));

	if (activePlayer === "firstPlayer") {
		yield put(setFleetForSecondPlayer(newFleet));
		yield put(setBoardForSecondPlayer(boardAfterShot));
	}

	if (activePlayer === "secondPlayer") {
		yield put(setFleetForFirstPlayer(newFleet));
		yield put(setBoardForFirstPlayer(boardAfterShot));
	}

	const bonus = yield select(selectBonus);
	if (!bonus || (bonus && hitShip === undefined)) {
		yield put(subtractShot());
	}
	yield delay(100);
	if (sound && (isSunkShip || hitShip)) {
		const sunkSound = new Audio(sunk);
		const hitSound = new Audio(hit);
		hitShip && hitSound.play();
		isSunkShip && sunkSound.play();
	}

	const winner = yield call(isWinner, {fleet: newFleet, activePlayer});
	if (winner) {
		yield delay(3000);
		yield put(setWinner(winner))
		return;
	}

	const numberOfShots = yield select(forActivePlayer[activePlayer].selectNumberOfShots)
	if (numberOfShots <= 0) {
		yield delay(1500);
		if (sound) {
			const audio = new Audio(siren);
			audio.play();
		}

		const state = yield select(selectState);
		if (state !== "playGame") return;
		yield put(setActivePlayer(forActivePlayer[activePlayer].changeActivePlayer));
		yield put(setNumberOfShots());
	} else {
		yield put(clearAfterShot());
	}
}

function* setActivePlayerHandler() {
	console.log("test")
	const activePlayer = yield select(selectActivePlayer);
	if (activePlayer === null) return;
	const gameMode = yield select(selectGameMode);
	const mayTouch = yield select(selectMayTouch);
	const difficultyLevel = yield select(selectDifficultyLevel);
	const winner = yield select(selectWinner);
	const player1 = "firstPlayer";
	const player2 = "secondPlayer";
	yield delay(300);

	if (activePlayer === player1 && gameMode === "compVsComp") {
		const boardToShots = yield select(selectFirstPlayerBoardToShots);
		const target = yield call(computerChooses, {difficultyLevel, boardToShots, mayTouch});
		if (target === undefined || winner) return;
		yield put(setTarget({target, player: player1}));
		yield put(setShot({shotInCell: target, player: player1}));
	}

	if (activePlayer === player2 && (gameMode === "compVsPlayer" || gameMode === "compVsComp")) {
		const boardToShots = yield select(selectSecondPlayerBoardToShots);
		const target = yield call(computerChooses, {difficultyLevel, boardToShots, mayTouch});
		if (target === undefined || winner) return;
		yield put(setTarget({target, player: player2}));
		yield put(setShot({shotInCell: target, player: player2}));
	}
}

export function* shipGameSaga() {
	yield takeLatest(setShips.type, setShipsHandler);
	yield takeLatest(setShipSelectedNumber.type, setShipSelectedNumberHandler);
	yield takeLatest(setChangeShipPlace.type, setChangeShipPlaceHandler);
	yield takeLatest(setTarget.type, setTargetHandler);
	yield takeLatest(setShot.type, setShotHandler);
	yield takeLatest(setActivePlayer.type, setActivePlayerHandler);
	yield takeLatest(clearAfterShot.type, setActivePlayerHandler)
}