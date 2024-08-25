import {createSlice} from "@reduxjs/toolkit";
import {boardSchemat} from "./ChangeShips/boardSchemat.jsx";

const shipGameSlice = createSlice({
		name: "shipGame",
		initialState: {
			board: boardSchemat(),
			fleet: [],
			fleetOnBoard: [],
			state: "home",
			parameters: {
				players: "compVsComp",
				numberOfShips: "10",
				shots: "single",
				mayTouch: false,
			},
			selected: {
				item: null,
				ship: null,
				rotateStep: null,
			},
		},
		reducers:
			{
				setBoard: (state, {payload: board}) => {
					state.board = board;
				},
				setFleet: (state, {payload: fleet}) => {
					state.fleet = fleet;
				},
				setFleetOnBoard: (state, {payload: fleetOnBoard}) => {
					state.fleetOnBoard = fleetOnBoard;
				},
				setPlayers:
					(state, {payload: players}) => {
						state.parameters.players = players;
					},
				setNumberOfShips:
					(state, {payload: numberOfShips}) => {
						state.parameters.numberOfShips = numberOfShips;
					},
				setShots:
					(state, {payload: shots}) => {
						state.parameters.shots = shots;
					},
				setMayTouch:
					(state, {payload: mayTouch}) => {
						state.parameters.mayTouch = mayTouch;
					},
				setItemSelect:
					(state, {payload: cell}) => {
						state.fleetOnBoard = state.fleetOnBoard.map((ship) =>
							ship.map((item) => (cell.ship.numberOfShip === item.numberOfShip) && !cell.selected ?
								{...item, selected: true} : {...item, selected: false}))
					},
				setRotateShip:
					() => {
					},
				setHomeState:
					(state) => {
						state.state = "home"
					},
				setSettingsState:
					(state) => {
						state.state = "settings"
					},
				setChangeShipsState:
					(state) => {
						state.state = "changeShips"
					},
				moveToTop: (state, {payload: {board, selectedShip}}) => {

				},
			}
		,
	})
;

export const {
	setBoard,
	setFleet,
	setFleetOnBoard,
	setPlayers,
	setNumberOfShips,
	setShots,
	setMayTouch,
	setItemSelect,
	setRotateShip,
	setHomeState,
	setSettingsState,
	setChangeShipsState,
	moveToTop
}
	= shipGameSlice.actions;

const selectPlayState = (state) => state.shipGame;

export const selectBoard = (state) => selectPlayState(state).board;

export const selectState = (state) => selectPlayState(state).state;
export const selectColumns = (state) =>
	selectBoard(state).columns;
export const selectRows = (state) =>
	selectColumns(state).rows;
export const selectCell = (state) =>
	selectRows(state).cell;

export const selectFleet = (state) => selectPlayState(state).fleet;
export const selectFleetOnBoard = (state) => selectPlayState(state).fleetOnBoard;


export const selectParameters = (state) => selectPlayState(state).parameters;
export const selectPlayers = (state) => selectParameters(state).players
export const selectNumberOfShips = (state) => selectParameters(state).numberOfShips
export const selectShots = (state) => selectParameters(state).shots
export const selectMayTouch = (state) => selectParameters(state).mayTouch

export const selectSelected = (state) => selectPlayState(state).selected;
export const selectSelectedItem = (state) => selectSelected(state).item;
export const selectSelectedShip = (state) => selectSelected(state).ship;

export default shipGameSlice.reducer;


