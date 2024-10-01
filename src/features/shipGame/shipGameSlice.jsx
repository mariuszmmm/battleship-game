import {createSlice} from "@reduxjs/toolkit";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";
import {getLocalStorage, setLocalStorage} from "../../utils/localStorage.jsx"

const parameters = {
	gameMode: "compVsPlayer",
	difficultyLevel: "easy",
	numberOfShips: 5,
	numberOfShots: 1,
	shotsEqualShips: false,
	mayTouch: false,
	bonus: false,
	sound: true,
};

const stateOfPlayers = {
	board: boardSchemat(),
	boardToShots: boardSchemat(),
	fleet: {},
	numberOfShips: null,
	numberOfShots: null,
	target: null,
	shotInCell: null,
};

const getInitialState = () => ({
	state: "home",
	parameters: getLocalStorage("parameters") || {...parameters},
	activePlayer: null,
	firstPlayer: {...stateOfPlayers},
	secondPlayer: {...stateOfPlayers},
	settingShips: {
		selectedShip: {number: null, ship: []},
		changeShipPlace: null,
		lockedMoves: {},
		wrongSettingOfShips: false,
		approvedSetting: true,
	},
	winner: null,
});

const shipGameSlice = createSlice({
	name: "shipGame",
	initialState: getInitialState(),
	reducers:
		{
			setState: (state, {payload: currentState}) => {
				state.state = currentState;
			},
			setParameters: (state, {payload: parameter}) => {
				state.parameters = {
					...state.parameters,
					...parameter,
				};
				setLocalStorage("parameters", state.parameters);
			},
			setShips: (state) => {
				const numberOfShips = state.parameters.numberOfShips;
				state.firstPlayer = {
					...state.firstPlayer, numberOfShips
				};
				state.secondPlayer = {
					...state.secondPlayer, numberOfShips
				};
			},
			setActivePlayer: (state, {payload: activePlayer}) => {
				state.activePlayer = activePlayer;
				state.firstPlayer.target = null;
				state.firstPlayer.shotInCell = null;
				state.secondPlayer.target = null;
				state.secondPlayer.shotInCell = null;
			},
			setBoardForFirstPlayer: (state, {payload: board}) => {
				state.firstPlayer.board = board;
			},
			setBoardForSecondPlayer: (state, {payload: board}) => {
				state.secondPlayer.board = board;
			},
			setBoardForPlayerShots: (state, {payload: board}) => {
				state[state.activePlayer].boardToShots = board;
			},
			setFleetForFirstPlayer: (state, {payload: fleet}) => {
				state.firstPlayer.fleet = fleet
			},
			setFleetForSecondPlayer: (state, {payload: fleet}) => {
				state.secondPlayer.fleet = fleet
			},
			setNumberOfShips: (state, {payload: number}) => {
				if (state.activePlayer === "firstPlayer") state["secondPlayer"].numberOfShips = number;
				if (state.activePlayer === "secondPlayer") state["firstPlayer"].numberOfShips = number;
			},
			setTarget: (state, {payload: {target, player}}) => {
				if (player !== state.activePlayer) return;
				state[state.activePlayer].target = target
			},
			setShot: (state, {payload: {shotInCell, player}}) => {
				if (player !== state.activePlayer) return;
				state[state.activePlayer].shotInCell = shotInCell
			},
			subtractShot: (state) => {
				const player = state[state.activePlayer];
				if (player.numberOfShots > 0) player.numberOfShots--;
			},
			setNumberOfShots: (state) => {
				if (state.parameters.shotsEqualShips) {
					state[state.activePlayer].numberOfShots = state[state.activePlayer].numberOfShips;
				} else {
					state[state.activePlayer].numberOfShots = state.parameters.numberOfShots;
				}
			},
			setShipSelectedNumber:
				(state, {payload: number}) => {
					state.settingShips.selectedShip.number = number;
				},
			setSelectedShip: (state, {payload: ship}) => {
				state.settingShips.selectedShip.ship = ship;
			},
			setChangeShipPlace: (state, {payload: change}) => {
				state.settingShips.changeShipPlace = change
			},
			setLockedMoves: (state, {payload: lockedMoves}) => {
				state.settingShips.lockedMoves = {...state.lockedMoves, ...lockedMoves};
			},
			setWrongSettingOfShips: (state, {payload: wrongSettingOfShips}) => {
				state.settingShips.wrongSettingOfShips = wrongSettingOfShips
			},
			setApprovedSetting: (state, {payload: boolean}) => {
				state.settingShips.approvedSetting = boolean;
			},
			setClearBoard: () => getInitialState(),
			clearAfterShot: (state) => {
				state.firstPlayer.target = null;
				state.firstPlayer.shotInCell = null;
				state.secondPlayer.target = null;
				state.secondPlayer.shotInCell = null;
			},
			setWinner: (state, {payload: winner}) => {
				state.winner = winner;
				if (state.parameters.gameMode === "compVsComp") return;
				const results = getLocalStorage("results");
				if (winner === "firstPlayer") setLocalStorage("results", results?.wygrana ?
					{...results, wygrana: ++results.wygrana}
					:
					{...results, wygrana: 1});
				if (winner === "secondPlayer") setLocalStorage("results", results?.przegrana ?
					{...results, przegrana: ++results.przegrana}
					:
					{...results, przegrana: 1});
			},
		}
});

export const {
	setState,
	setParameters,
	setActivePlayer,
	setBoardForFirstPlayer,
	setBoardForSecondPlayer,
	setBoardForPlayerShots,
	setFleetForFirstPlayer,
	setFleetForSecondPlayer,
	setNumberOfShips,
	setShips,
	setTarget,
	setShot,
	subtractShot,
	setNumberOfShots,
	setShipSelectedNumber,
	setSelectedShip,
	setChangeShipPlace,
	setLockedMoves,
	setWrongSettingOfShips,
	setApprovedSetting,
	setClearBoard,
	clearAfterShot,
	setWinner,
}
	= shipGameSlice.actions;

const selectPlayState = (state) => state.shipGame;

export const selectState = (state) => selectPlayState(state).state;

export const selectParameters = (state) => selectPlayState(state).parameters;
export const selectGameMode = (state) => selectParameters(state).gameMode;
export const selectDifficultyLevel = (state) => selectParameters(state).difficultyLevel;
export const selectNumberOfShips = (state) => selectParameters(state).numberOfShips;
export const selectNumberOfShots = (state) => selectParameters(state).numberOfShots;
export const selectMayTouch = (state) => selectParameters(state).mayTouch;
export const selectBonus = (state) => selectParameters(state).bonus;
export const selectShotsEqualShips = (state) => selectParameters(state).shotsEqualShips;
export const selectSound = (state) => selectParameters(state).sound;

export const selectActivePlayer = (state) => selectPlayState(state).activePlayer;

export const selectFirstPlayer = (state) => selectPlayState(state).firstPlayer;
export const selectFirstPlayerBoard = (state) => selectFirstPlayer(state).board;
export const selectFirstPlayerBoardToShots = (state) => selectFirstPlayer(state).boardToShots;
export const selectFirstPlayerTarget = (state) => selectFirstPlayer(state).target;
export const selectFirstPlayerShotInCell = (state) => selectFirstPlayer(state).shotInCell;
export const selectFirstPlayerFleet = (state) => selectFirstPlayer(state).fleet;
export const selectFirstPlayerNumberOfShips = (state) => selectFirstPlayer(state).numberOfShips;
export const selectFirstPlayerNumberOfShots = (state) => selectFirstPlayer(state).numberOfShots;

export const selectSecondPlayer = (state) => selectPlayState(state).secondPlayer;
export const selectSecondPlayerBoard = (state) => selectSecondPlayer(state).board;
export const selectSecondPlayerBoardToShots = (state) => selectSecondPlayer(state).boardToShots;
export const selectSecondPlayerShotInCell = (state) => selectSecondPlayer(state).shotInCell;
export const selectSecondPlayerFleet = (state) => selectSecondPlayer(state).fleet;
export const selectSecondPlayerNumberOfShips = (state) => selectSecondPlayer(state).numberOfShips;
export const selectSecondPlayerNumberOfShots = (state) => selectSecondPlayer(state).numberOfShots;

export const selectSettingShips = (state) => selectPlayState(state).settingShips;
export const selectSelected = (state) => selectSettingShips(state).selectedShip;
export const selectSelectedShip = (state) => selectSelected(state).ship;
export const selectChangeShipPlace = (state) => selectSettingShips(state).changeShipPlace;
export const selectLockedMoves = (state) => selectSettingShips(state).lockedMoves;
export const selectWrongSettingOfShips = (state) => selectSettingShips(state).wrongSettingOfShips;
export const selectApprovedSetting = (state) => selectSettingShips(state).approvedSetting;

export const selectWinner = (state) => selectPlayState(state).winner;

export default shipGameSlice.reducer;


