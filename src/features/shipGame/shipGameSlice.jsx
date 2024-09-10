import {createSlice} from "@reduxjs/toolkit";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";

const defaultState = {
	firstPlayer: {
		board: boardSchemat(),
		boardToShots: boardSchemat(),
		target: null,
		shotInCell: null,
		numberOfShots: 0,

		approvedSetting: false,
	},
	computer: {
		board: boardSchemat(),
		boardToShots: boardSchemat(),
		target: null,
		shotInCell: null,
		numberOfShots: 0,
	},
	activePlayer: "firstPlayer",
	state: "home",
	parameters: {
		players: "compVsPlayer",
		numberOfShips: "10",
		shots: {name: "single", number: 1},
		mayTouch: false,
	},
	selectedShip: {
		number: null,
		ship: []
	},
	movedShip: [],
	changeShipPlace: null,
	lockedMoves: {},
	wrongSettingOfShips: false,
};

const shipGameSlice = createSlice({
	name: "shipGame",
	initialState: defaultState,
	reducers:
		{
			setBoardForFirstPlayer: (state, {payload: board}) => { //used
				state.firstPlayer.board = board;
			},
			setBoardForFirstPlayersShots: (state, {payload: board}) => { //used
				state.firstPlayer.boardToShots = board;
			},
			setBoardForComputer: (state, {payload: board}) => { //used
				state.computer.board = board;
			},
			setBoardForComputersShots: (state, {payload: board}) => { //used
				state.computer.boardToShots = board;
			},
			setPlayers:
				(state, {payload: players}) => { //used
					state.parameters.players = players;
				},
			setNumberOfShips:
				(state, {payload: numberOfShips}) => { //used
					state.parameters.numberOfShips = numberOfShips;
				},
			setShots:
				(state, {payload: shots}) => { //used
					state.parameters.shots = shots;
				},
			setMayTouch:
				(state, {payload: mayTouch}) => { //used
					state.parameters.mayTouch = mayTouch;
				},
			setHomeState:
				(state) => { //used
					state.state = "home"
				},
			setSettingsState:
				(state) => { //used
					state.state = "settings"
				},
			setShips:
				(state) => { //used
					state.state = "setShips";
				},
			setPlayGame:
				(state) => { //used
					state.state = "playGame";
				},
			setShipSelectedNumber:
				(state, {payload: number}) => { //used
					state.selectedShip.number = number;
				},
			setSelectedShip: (state, {payload: selectedShip}) => { //used
				state.selectedShip.ship = selectedShip;
			},
			setChangeShipPlace: (state, {payload: change}) => {  //used
				state.changeShipPlace = change
			},
			setLockedMoves: (state, {payload: lockedMoves}) => {  // used
				state.lockedMoves = {...state.lockedMoves, ...lockedMoves};
			},
			setWrongSettingOfShips: (state, {payload: wrongSettingOfShips}) => { // used
				state.wrongSettingOfShips = wrongSettingOfShips
			},
			setApprovedSetting: (state, {payload: boolean}) => { // used
				state[state.activePlayer].approvedSetting = boolean;
			},
			setActivePlayer: (state, {payload: activePlayer}) => {
				state.activePlayer = activePlayer;
			},
			setTarget: (state, {payload: {target, player}}) => {
				if (player !== state.activePlayer) return;
				if (state.activePlayer === "firstPlayer") state.firstPlayer.target = target
				if (state.activePlayer === "computer") state.computer.target = target
			},
			setShot: (state, {payload: {shotInCell}}) => {
				if (state.activePlayer === "firstPlayer") state.firstPlayer.shotInCell = shotInCell
				if (state.activePlayer === "computer") state.computer.shotInCell = shotInCell
			},
			subtractShot: (state) => {
				if (state.activePlayer === "firstPlayer") {
					if (state.firstPlayer.numberOfShots <= 0) return
					state.firstPlayer.numberOfShots -= 1
				}
				if (state.activePlayer === "computer") {
					if (state.computer.numberOfShots <= 0) return
					state.computer.numberOfShots -= 1
				}
			},
			setNumberOfShots: (state) => {
				if (state.activePlayer === "firstPlayer") state.firstPlayer.numberOfShots = state.parameters.shots.number
				if (state.activePlayer === "computer") state.computer.numberOfShots = state.parameters.shots.number
			},
		}
});

export const {
	setBoardForFirstPlayer,
	setBoardForFirstPlayersShots,
	setBoardForComputer,
	setBoardForComputersShots,
	setPlayers,
	setNumberOfShips,
	setShots,
	setMayTouch,
	setShipSelectedNumber,
	setHomeState,
	setSettingsState,
	setShips,
	setChangeShipPlace,
	setLockedMoves,
	setWrongSettingOfShips,
	setSelectedShip,
	setApprovedSetting,
	setPlayGame,
	setTarget,
	setShot,
	subtractShot,
	setNumberOfShots,
	setActivePlayer,
}
	= shipGameSlice.actions;

const selectPlayState = (state) => state.shipGame;

export const selectState = (state) => selectPlayState(state).state;

export const selectActivePlayer = (state) => selectPlayState(state).activePlayer;

export const selectFirstPlayer = (state) => selectPlayState(state).firstPlayer;
export const selectFirstPlayerBoard = (state) => selectFirstPlayer(state).board;
export const selectFirstPlayerBoardToShots = (state) => selectFirstPlayer(state).boardToShots;
export const selectFirstPlayerTarget = (state) => selectFirstPlayer(state).target;
export const selectFirstPlayerShotInCell = (state) => selectFirstPlayer(state).shotInCell;
export const selectFirstPlayerNumberOfShots = (state) => selectFirstPlayer(state).numberOfShots;
export const selectFirstPlayerApprovedSetting = (state) => selectFirstPlayer(state).approvedSetting;

export const selectComputer = (state) => selectPlayState(state).computer;
export const selectComputerBoard = (state) => selectComputer(state).board;
export const selectComputerBoardToShots = (state) => selectComputer(state).boardToShots;
export const selectComputerTarget = (state) => selectComputer(state).target;
export const selectComputerShotInCell = (state) => selectComputer(state).shotInCell;
export const selectComputerNumberOfShots = (state) => selectComputer(state).numberOfShots;

export const selectParameters = (state) => selectPlayState(state).parameters; //used
export const selectPlayers = (state) => selectParameters(state).players
export const selectNumberOfShips = (state) => selectParameters(state).numberOfShips
export const selectShots = (state) => selectParameters(state).shots
export const selectMayTouch = (state) => selectParameters(state).mayTouch

export const selectSelected = (state) => selectPlayState(state).selectedShip;
export const selectSelectedShip = (state) => selectSelected(state).ship;

export const selectLockedMoves = (state) => selectPlayState(state).lockedMoves;
export const selectWrongSettingOfShips = (state) => selectPlayState(state).wrongSettingOfShips;
export const selectApprovedSetting = (state) => selectPlayState(state).approvedSetting;

export default shipGameSlice.reducer;

