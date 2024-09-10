import {coordinatesAround} from "../../../utils/coordinatesAround.jsx"

export const setPlacesAroundCell = (tempBoard, cell, value) => (
	tempBoard.map((col) => col.map((row) => (
			coordinatesAround.some((coordinate) =>
				(row.col.number === cell.col.number + coordinate[0]) &&
				(row.row.number === cell.row.number + coordinate[1])
			) && row.cell !== "ship"
				?
				{...row, cell: value}
				:
				{...row}
		))
	));

export const warningsAroundCell = (allShip, tempBoard) => {
	let warningsForShipNumbers = [];

	allShip.forEach((ship) => {
		tempBoard.forEach((col) => col.forEach((cell) => {
			if (coordinatesAround.some((coordinate) =>
				(ship.place.col === cell.col.number + coordinate[0]) &&
				(ship.place.row === cell.row.number + coordinate[1]) &&
				cell.cell === "ship" &&
				(ship.numberOfShip !== cell.ship.numberOfShip)
			)) {
				if (!warningsForShipNumbers.includes(ship.numberOfShip)) {
					warningsForShipNumbers = [...warningsForShipNumbers, ship.numberOfShip];
				}
			}
		}))
	})

	return warningsForShipNumbers;
};