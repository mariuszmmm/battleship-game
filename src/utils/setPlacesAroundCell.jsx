import {coordinatesAround} from "./coordinates.jsx";

export const setPlacesAroundCell = (board, cell, valueName, value) => (
	board.map((col) => col.map((row) => (
			coordinatesAround.some((coordinate) =>
				(row.col.number === cell.col.number + coordinate[0]) &&
				(row.row.number === cell.row.number + coordinate[1])
			) && row.cell !== "ship"
				?
				{...row, [valueName]: value}
				:
				{...row}
		))
	));