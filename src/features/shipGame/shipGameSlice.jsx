import {createSlice} from "@reduxjs/toolkit";
import {boardSchemat} from "./ChangeShips/boardSchemat.jsx";

const shipGameSlice = createSlice({
		name: "shipGame",
		initialState: {
			board: boardSchemat(),
			fleet: [],
			state: "home",
			parameters: {
				players: "compVsPlayer",
				numberOfShips: "10",
				shots: "single",
				mayTouch: false,
			},
			selectedShip: [],
			movedShip: [],
			changeShipPlace: null,
			warning: {
				top: false,
				down: false,
				left: false,
				right: false,
				rotate: false,
			},
			isWarning: false,
		},
		reducers:
			{
				setBoard: (state, {payload: board}) => {
					state.board = board;
				},
				setFleet: (state, {payload: fleet}) => {
					state.fleet = fleet;
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
				setHomeState:
					(state) => {
						state.state = "home"
					},
				setSettingsState:
					(state) => {
						state.state = "settings"
					},
				changesShips:
					(state) => {
						state.state = "changesShips";
						state.selectedShip = [];
					},
				shipSelect:
					(state, {payload: {board, cell, selectedShip, movedShip, isWarning}}) => {
						if (!cell && !movedShip && !isWarning) {
							state.selectedShip = []
							return
						}
						let ship = [];
						if (movedShip?.length > 0) {
							ship = [...movedShip]
							return
						} else if (selectedShip.every((item) => item.numberOfShip !== cell.ship.numberOfShip)) {
							board.forEach((col) => col.forEach((row) => {
									if (row.ship?.numberOfShip === cell.ship.numberOfShip) {
										ship = [...ship, row.ship]
									}
								}
							))
						}
						state.selectedShip = [...ship];
					},
				setChangeShipPlace: (state, {payload: change}) => {
					state.changeShipPlace = change
				},
				setWarning: (state, {payload: warning}) => {
					state.warning = warning
				},
				setIsWarning: (state, {payload: isWarning}) => {
					state.isWarning = isWarning
				},
			}
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
	shipSelect,
	setHomeState,
	setSettingsState,
	changesShips,
	setChangeShipPlace,
	setWarning,
	setIsWarning,
}
	= shipGameSlice.actions;

const selectPlayState = (state) => state.shipGame;

export const selectBoard = (state) => selectPlayState(state).board;

// export const selectState = (state) => selectPlayState(state).state;
// export const selectColumns = (state) =>	selectBoard(state).columns;
// export const selectRows = (state) =>	selectColumns(state).rows;
// export const selectCell = (state) => selectRows(state).cell;

export const selectParameters = (state) => selectPlayState(state).parameters;
export const selectPlayers = (state) => selectParameters(state).players
export const selectNumberOfShips = (state) => selectParameters(state).numberOfShips
export const selectShots = (state) => selectParameters(state).shots
export const selectMayTouch = (state) => selectParameters(state).mayTouch
export const selectSelectedShip = (state) => selectPlayState(state).selectedShip;
export const selectWarning = (state) => selectPlayState(state).warning;
export const selectIsWarning = (state) => selectPlayState(state).isWarning;

export default shipGameSlice.reducer;


