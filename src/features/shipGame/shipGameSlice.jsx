import {createSlice} from "@reduxjs/toolkit";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";

const defaultState = {
	state: "home",
	parameters: {
		players: "compVsPlayer",
		numberOfShips: 5,
		numberOfShots: 1,
		mayTouch: false,
	},
	activePlayer: null,
	firstPlayer: {
		board: boardSchemat(),
		boardToShots: boardSchemat(),
		fleet: [],
		target: null,
		shotInCell: null,
		numberOfShots: 0,
	},
	secondPlayer: {
		board: boardSchemat(),
		boardToShots: boardSchemat(),
		fleet: [],
		target: null,
		shotInCell: null,
		numberOfShots: 0,
	},
	settingShips: {
		selectedShip: {number: null, ship: []},
		changeShipPlace: null,
		lockedMoves: {},
		wrongSettingOfShips: false,
		approvedSetting: false,
	},
};

const shipGameSlice = createSlice({
	name: "shipGame",
	initialState: defaultState,
	reducers:
		{
			setState: (state, {payload: currentState}) => {
				state.state = currentState;
			},
			setParameters: (state, {payload: parameter}) => {
				state.parameters = {...state.parameters, ...parameter};
			},
			setActivePlayer: (state, {payload: activePlayer}) => {
				state.activePlayer = activePlayer;
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
			setTarget: (state, {payload: {target, player}}) => {
				if (player !== state.activePlayer) return;
				state[state.activePlayer].target = target
			},
			setShot: (state, {payload: {shotInCell}}) => {
				state[state.activePlayer].shotInCell = shotInCell
			},
			subtractShot: (state) => {
				const player = state[state.activePlayer];
				if (player.numberOfShots > 0) player.numberOfShots--;
			},
			setNumberOfShots: (state) => {
				state[state.activePlayer].numberOfShots = state.parameters.numberOfShots;
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
			setClearBoard: () => defaultState,
			clearAfterSwitchActivePlayer: (state) => {
				state.firstPlayer.target = null;
				state.firstPlayer.shotInCell = null;
				state.secondPlayer.target = null;
				state.secondPlayer.shotInCell = null;
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
	clearAfterSwitchActivePlayer,
}
	= shipGameSlice.actions;

const selectPlayState = (state) => state.shipGame;

export const selectState = (state) => selectPlayState(state).state;

export const selectParameters = (state) => selectPlayState(state).parameters;
export const selectPlayers = (state) => selectParameters(state).players
export const selectNumberOfShips = (state) => selectParameters(state).numberOfShips
export const selectNumberOfShots = (state) => selectParameters(state).numberOfShots
export const selectMayTouch = (state) => selectParameters(state).mayTouch

export const selectActivePlayer = (state) => selectPlayState(state).activePlayer;

export const selectFirstPlayer = (state) => selectPlayState(state).firstPlayer;
export const selectFirstPlayerBoard = (state) => selectFirstPlayer(state).board;
export const selectFirstPlayerBoardToShots = (state) => selectFirstPlayer(state).boardToShots;
export const selectFirstPlayerTarget = (state) => selectFirstPlayer(state).target;
export const selectFirstPlayerShotInCell = (state) => selectFirstPlayer(state).shotInCell;
export const selectFirstPlayerFleet = (state) => selectFirstPlayer(state).fleet;
export const selectFirstPlayerNumberOfShots = (state) => selectFirstPlayer(state).numberOfShots;

export const selectSecondPlayer = (state) => selectPlayState(state).secondPlayer;
export const selectSecondPlayerBoard = (state) => selectSecondPlayer(state).board;
export const selectSecondPlayerBoardToShots = (state) => selectSecondPlayer(state).boardToShots;
export const selectSecondPlayerTarget = (state) => selectSecondPlayer(state).target;
export const selectSecondPlayerShotInCell = (state) => selectSecondPlayer(state).shotInCell;
export const selectSecondPlayerFleet = (state) => selectSecondPlayer(state).fleet;
export const selectSecondPlayerNumberOfShots = (state) => selectSecondPlayer(state).numberOfShots;

export const selectSettingShips = (state) => selectPlayState(state).settingShips;
export const selectSelected = (state) => selectSettingShips(state).selectedShip;
export const selectSelectedShip = (state) => selectSelected(state).ship;
export const selectChangeShipPlace = (state) => selectSettingShips(state).changeShipPlace;
export const selectLockedMoves = (state) => selectSettingShips(state).lockedMoves;
export const selectWrongSettingOfShips = (state) => selectSettingShips(state).wrongSettingOfShips;
export const selectApprovedSetting = (state) => selectSettingShips(state).approvedSetting;

export default shipGameSlice.reducer;


