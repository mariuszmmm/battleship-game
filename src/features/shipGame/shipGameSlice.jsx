import {createSlice} from "@reduxjs/toolkit";
import {boardSchemat} from "./ChangeShips/boardSchemat.jsx";

const shipGameSlice = createSlice({
		name: "shipGame",
		initialState: {
			board: boardSchemat(),
			fleet: [],
			// fleetOnBoard: [],
			state: "home",
			parameters: {
				players: "compVsComp",
				numberOfShips: "10",
				shots: "single",
				mayTouch: true,
			},
			selectedShip: [],
			movedShip: [],
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
				// setSelect:
				// 	(state, {payload: cell}) => {
				// 		state.fleetOnBoard = state.fleetOnBoard.map((ship) =>
				// 			ship.map((item) =>
				// 				(cell.ship.numberOfShip === item.numberOfShip) &&
				// 				!cell.selected ?
				// 					{...item, selected: true} : {...item, selected: false}))
				// 	},
				// setSelectedShip:
				// 	(state, {payload: selectedShip}) => {
				// 		state.selectedShip = [...selectedShip];
				// 	},
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
				shipSelect:
					(state, {payload: {board, cell, selectedShip}}) => {
						let ship = [];
						if (selectedShip.every((item) => item.numberOfShip !== cell.ship.numberOfShip)) {
							board.forEach((col) => col.forEach((row) => {
									if (row.ship?.numberOfShip === cell.ship.numberOfShip) {
										ship = [...ship, row.ship]
									}
								}
							))
						}
						state.selectedShip = ship;
					},
				moveToTop: (state, {payload:  selectedShip}) => {

					// console.log(board.forEach((col) =>
					// 	col.forEach((cell) => { return  cell.row.number})					))

					// if (selectedShip.some((item) => board.forEach((col) =>
					// 	col.forEach((cell) => item.place.row === cell.row.number - 1)
					// ))) return
					if (selectedShip.some((item) => item.place.row === 1)) return
					let movedShip = []

					movedShip = selectedShip.map((item) =>
						({...item, place: {...item.place, row: item.place.row - 1}})
					)
					state.movedShip = movedShip;
					state.selectedShip = movedShip;
				},
				moveToDown: (state, {payload: selectedShip}) => {
					if (selectedShip.some((item) => item.place.row === 10)) return
					let movedShip = []

					movedShip = selectedShip.map((item) =>
						({...item, place: {...item.place, row: item.place.row + 1}})
					)
					state.movedShip = movedShip;
					state.selectedShip = movedShip;
				},
				moveToLeft: (state, {payload: selectedShip}) => {
					if (selectedShip.some((item) => item.place.col === 1)) return
					let movedShip = []

					movedShip = selectedShip.map((item) =>
						({...item, place: {...item.place, col: item.place.col - 1}})
					)
					state.movedShip = movedShip;
					state.selectedShip = movedShip;
				},
				moveToRight: (state, {payload: selectedShip}) => {
					if (selectedShip.some((item) => item.place.col === 10)) return
					let movedShip = []

					movedShip = selectedShip.map((item) =>
						({...item, place: {...item.place, col: item.place.col + 1}})
					)
					state.movedShip = movedShip;
					state.selectedShip = movedShip;
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
	// setSelect,
	// setSelectedShip,
	shipSelect,
	setRotateShip,
	setHomeState,
	setSettingsState,
	setChangeShipsState,
	moveToTop,
	moveToDown,
	moveToLeft,
	moveToRight
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

export const selectSelectedShip = (state) => selectPlayState(state).selectedShip;
export const selectMovedShip = (state) => selectPlayState(state).movedShip

export default shipGameSlice.reducer;


