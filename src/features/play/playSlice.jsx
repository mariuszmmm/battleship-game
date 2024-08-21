import {createSlice} from "@reduxjs/toolkit";
import {boardSchemat} from "./Play/boardSchemat.jsx";

const playSlice = createSlice({
		name: "play",
		initialState: {
			board: boardSchemat(),
			state: "ready",
			parameters: {
				players: "compVsComp",
				numberOfShips: "10",
				shots: "single",
				mayTouch: false,
			}
		},
		reducers:
			{
				setBoard: (state, {payload: board}) => {
					state.board = board;
				},
				setStateNewGame:
					(state) => {
						state.board = boardSchemat();
						state.state = "newGame"
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
					}
			}
		,
	})
;

export const {
	setBoard,
	setStateNewGame,
	setPlayers,
	setNumberOfShips,
	setShots,
	setMayTouch
}
	= playSlice.actions;

const selectPlayState = (state) => state.play;

export const selectBoard = (state) => selectPlayState(state).board;

export const selectState = (state) => selectPlayState(state).state;
export const selectColumns = (state) =>
	selectBoard(state).columns;
export const selectRows = (state) =>
	selectColumns(state).rows;
export const selectCell = (state) =>
	selectRows(state).cell;
export default playSlice.reducer;

export const selectParameters = (state) => selectPlayState(state).parameters;
export const selectPlayers = (state) => selectParameters(state).players
export const selectNumberOfShips = (state) => selectParameters(state).numberOfShips
export const selectShots = (state) => selectParameters(state).shots
export const selectMayTouch = (state) => selectParameters(state).mayTouch

