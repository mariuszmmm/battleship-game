import {createSlice} from "@reduxjs/toolkit";
import {boardSchemat} from "./SetShips/boardSchemat.jsx";

const shipGameSlice = createSlice({
	name: "shipGame",
	initialState: {
		board: boardSchemat(),
		state: "home",
		parameters: {
			players: "compVsPlayer",
			numberOfShips: "10",
			shots: "single",
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
		approvedSetting: false,
	},
	reducers:
		{
			setBoard: (state, {payload: board}) => { //used
				state.board = board;
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
				state.approvedSetting = boolean;
			}
		}
});

export const {
	setBoard,
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
}
	= shipGameSlice.actions;

const selectPlayState = (state) => state.shipGame;

export const selectBoard = (state) => selectPlayState(state).board; //used
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


