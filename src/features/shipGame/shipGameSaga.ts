import {takeEvery, select, call, put, delay} from "redux-saga/effects";
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
	setLockedMoves, setWrongSettingOfShips,
	setTarget, setShot, subtractShot, setNumberOfShots,
	clearAfterShot, setShips,
	setWinner,
} from "./shipGameSlice";
import {addRandomShips} from "./SetShips/addRandomShips"
import {changeSelectedShip} from "./SetShips/changeSelectedShip";
import {getShips} from "./SetShips/getShips.js";
import {boardSchemat} from "./SetShips/boardSchemat";
import {moveShip} from "./SetShips/moveShip";
import {getTarget} from "./PlayGame/getTarget";
import {getShot} from "./PlayGame/getShot";
import {computerChooses} from "./PlayGame/computerChooses"
import {isWinner} from "./PlayGame/isWinner";
import shotSound from "../../assets/Audio/shot.mp3";
import sunk from "../../assets/Audio/sunk.mp3";
import siren from "../../assets/Audio/siren.mp3";

import hit from "../../assets/Audio/hit.mp3";
import {
	Board, CellId,
	ChangeShipPlace,
	Coordinate,
	Fleet,
	LockedMoves,
	Parameters, Player,
	SettingShips,
	ShipItem, StateOfPlayers
} from "../../types/types";

function* setShipsHandler() {
	const {mayTouch, numberOfShips}: Parameters = yield select(selectParameters);
	const board: Board = yield call(boardSchemat);
	const firstPlayersShips: Coordinate[][] = yield call(getShips, numberOfShips);
	const {fleet: firstPlayersFleet, newBoard: firstPlayersNewBoard}: { fleet: Fleet, newBoard: Board } =
		yield call(addRandomShips, {board, mayTouch, ships: firstPlayersShips});
	yield put(setBoardForFirstPlayer(firstPlayersNewBoard));
	yield put(setFleetForFirstPlayer(firstPlayersFleet));
	const secondPlayersShips: Coordinate[][] = yield call(getShips, numberOfShips);
	const {fleet: secondPlayersFleet, newBoard: secondPlayersNewBoard}: { fleet: Fleet, newBoard: Board } =
		yield call(addRandomShips, {board, mayTouch, ships: secondPlayersShips});
	yield put(setBoardForSecondPlayer(secondPlayersNewBoard));
	yield put(setFleetForSecondPlayer(secondPlayersFleet));
	yield put
}

function* setShipSelectedNumberHandler({payload: {number, approvedSetting}}: {
	payload: {
		number: SettingShips["selectedShip"]["number"];
		approvedSetting: SettingShips["approvedSetting"];
	}
}) {
	const board: Board = yield select(selectFirstPlayerBoard);
	const selectedShip: SettingShips["selectedShip"]["ship"] = yield select(selectSelectedShip);
	const {boardWithSelected, newSelectedShip, lockedMoves}: {
		boardWithSelected: Board,
		newSelectedShip: SettingShips["selectedShip"]["ship"],
		lockedMoves: LockedMoves
	} = yield call(changeSelectedShip, {board, number, selectedShip, approvedSetting});
	yield put(setLockedMoves(lockedMoves));
	yield put(setSelectedShip(newSelectedShip));
	yield put(setBoardForFirstPlayer(boardWithSelected));
}

function* setChangeShipPlaceHandler() {
	const change: ChangeShipPlace = yield select(selectChangeShipPlace);
	const board: Board = yield select(selectFirstPlayerBoard);
	const mayTouch: boolean = yield select(selectMayTouch);
	const selectedShip: ShipItem[] = yield select(selectSelectedShip);
	const {newSelectedShip, boardWithMoved, lockedMoves, wrongSettingOfShips}:
		{
			newSelectedShip: ShipItem[],
			boardWithMoved: Board,
			lockedMoves: LockedMoves,
			wrongSettingOfShips: boolean
		} = yield call(moveShip, {
		board,
		change,
		mayTouch,
		selectedShip
	});
	yield put(setWrongSettingOfShips(wrongSettingOfShips));
	yield put(setLockedMoves(lockedMoves));
	yield put(setSelectedShip(newSelectedShip));
	yield put(setBoardForFirstPlayer(boardWithMoved));
}

function* setTargetHandler({payload: {target, player}}: {
	payload: {
		target: StateOfPlayers["target"];
		player: Player;
	}
}) {
	const activePlayer: Player = yield select(selectActivePlayer);
	if (!activePlayer || !player) return;

	const boardToShots: Board = yield select(
		activePlayer === "firstPlayer" ? selectFirstPlayerBoardToShots : selectSecondPlayerBoardToShots
	);

	const newBoard: Board = yield call(getTarget, {target, boardToShots});
	yield put(setBoardForPlayerShots(newBoard));
}

function* setShotHandler() {
	const gameOver: "firstPlayer" | "secondPlayer" = yield select(selectWinner);
	const activePlayer: Player = yield select(selectActivePlayer);
	if (gameOver || !activePlayer) return;

	const shotInCell: CellId = yield select(activePlayer === "firstPlayer" ?
		selectFirstPlayerShotInCell : selectSecondPlayerShotInCell);
	const board: Board = yield select(activePlayer === "firstPlayer" ?
		selectSecondPlayerBoard : selectFirstPlayerBoard);
	const boardToShots: Board = yield select(activePlayer === "firstPlayer" ?
		selectFirstPlayerBoardToShots : selectSecondPlayerBoardToShots);
	const fleet: Fleet = yield select(activePlayer === "firstPlayer" ?
		selectSecondPlayerFleet : selectFirstPlayerFleet);
	const mayTouch: boolean = yield select(selectMayTouch);
	const {boardToShotsAfterShot, boardAfterShot, newFleet, shipsNumber, isSunkShip, hitShip}:
		{
			boardToShotsAfterShot: Board,
			boardAfterShot: Board,
			newFleet: Fleet,
			shipsNumber: number,
			isSunkShip: boolean,
			hitShip: ShipItem
		} =
		yield call(getShot, {boardToShots, board, shotInCell, fleet, mayTouch});
	const sound: boolean = yield select(selectSound);
	if (sound) {
		const audio = new Audio(shotSound);
		audio.volume = 0.2;
		audio && audio.play();
	}

	yield delay(300);
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

	const bonus: boolean = yield select(selectBonus);
	if (!bonus || (bonus && hitShip === undefined)) {
		yield put(subtractShot());
	}
	yield delay(100);
	if (sound && (isSunkShip || hitShip)) {
		const sunkSound = new Audio(sunk);
		const hitSound = new Audio(hit);
		hitSound.volume = 0.2;
		sunkSound.volume = 0.4;
		hitSound && hitSound.play();
		isSunkShip && sunkSound.play();
	}

	const winner: Player = yield call(isWinner, {fleet: newFleet, activePlayer});
	if (winner) {
		yield delay(3000);
		yield put(setWinner(winner))
		return;
	}

	const numberOfShots: number = yield select(activePlayer === "firstPlayer" ?
		selectFirstPlayerNumberOfShots : selectSecondPlayerNumberOfShots)
	if (numberOfShots <= 0) {
		yield delay(1500);
		if (sound) {
			const audio = new Audio(siren);
			audio.volume = 0.1;
			audio && audio.play();
		}

		const state: "home" | "playGame" = yield select(selectState);
		if (state !== "playGame") return;
		yield put(setActivePlayer(activePlayer === "firstPlayer" ? "secondPlayer" : "firstPlayer"));
		yield put(setNumberOfShots());
	} else {
		yield put(clearAfterShot());
	}
}

function* setActivePlayerHandler() {
	const activePlayer: Player = yield select(selectActivePlayer);
	if (activePlayer === null) return;
	const gameMode: Parameters["gameMode"] = yield select(selectGameMode);
	const mayTouch: boolean = yield select(selectMayTouch);
	const difficultyLevel: Parameters["difficultyLevel"] = yield select(selectDifficultyLevel);
	const winner: Player = yield select(selectWinner);
	const player1 = "firstPlayer";
	const player2 = "secondPlayer";
	yield delay(700);

	if (activePlayer === player1 && gameMode === "compVsComp") {
		const boardToShots: Board = yield select(selectFirstPlayerBoardToShots);
		const target: CellId | undefined = yield call(computerChooses, {difficultyLevel, boardToShots, mayTouch});
		if (target === undefined || winner) return;
		yield put(setTarget({target, player: player1}));
		yield put(setShot({shotInCell: target, player: player1}));
	}

	if (activePlayer === player2 && (gameMode === "compVsPlayer" || gameMode === "compVsComp")) {
		const boardToShots: Board = yield select(selectSecondPlayerBoardToShots);
		const target: CellId | undefined = yield call(computerChooses, {difficultyLevel, boardToShots, mayTouch});
		if (target === undefined || winner) return;
		yield put(setTarget({target, player: player2}));
		yield put(setShot({shotInCell: target, player: player2}));
	}
}

export function* shipGameSaga() {
	yield takeEvery(setShips, setShipsHandler);
	yield takeEvery(setShipSelectedNumber, setShipSelectedNumberHandler);
	yield takeEvery(setChangeShipPlace, setChangeShipPlaceHandler);
	yield takeEvery(setTarget, setTargetHandler);
	yield takeEvery(setShot, setShotHandler);
	yield takeEvery(setActivePlayer, setActivePlayerHandler);
	yield takeEvery(clearAfterShot, setActivePlayerHandler)
}