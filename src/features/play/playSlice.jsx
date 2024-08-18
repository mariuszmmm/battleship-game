import {createSlice} from "@reduxjs/toolkit";
import {boardSchemat} from "./Play/boardSchemat.jsx";

const playSlice = createSlice({
	name: "play",
	initialState: {
		board: boardSchemat(),
		state: "ready",
	},
	reducers: {
		setBoard: (state, {payload: board}) => {
			state.board = board;
		},
		setStateNewGame: (state) => {
			state.board = boardSchemat();
			state.state = "newGame"
		}
	},
});

export const {
	setBoard,
	setStateNewGame,
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