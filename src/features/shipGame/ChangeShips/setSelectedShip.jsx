import {moveWarning} from './moveWarning';
import {setPlacesReserved} from "./functionsCellActions.jsx";

export const setSelectedShip = ({board, ship, isWarning}) => {
	let boardWithSelected = board.map((col) => col.map((row) => {
		if (row.cell === "ship") {
			return ship.some((shipItem) =>
				(row.ship?.place?.col === shipItem.place.col) &&
				(row.ship?.place?.row === shipItem.place.row)
			)
				?
				({...row, ship: {...row.ship, selected: true}})
				:
				({...row, ship: {...row.ship, selected: false}})
		} else {
			return {...row}
		}
	}))

	let placesOtherShips = [];
	boardWithSelected.forEach((col) => col.forEach((cell) => {
		if (cell.cell === "ship" && !cell.ship?.selected) {
			placesOtherShips = [...placesOtherShips, cell.ship.place]
		}
	}))

	let tempBoard = [...boardWithSelected];
	if (ship.length > 0) {
		boardWithSelected.forEach((col) => col.forEach((cell) => {
			if (cell.cell === "ship") {
				const boardWithReserved = setPlacesReserved(tempBoard, cell, "reserved");
				tempBoard = [...boardWithReserved]
			}
		}))
	} else {
		const clearEmptyOnBoard = boardWithSelected.map((col) => col.map((cell) => {
			if (cell.cell === "ship") {
				return {...cell}
			} else {
				return {...cell, cell: "empty"}
			}
		}))
		tempBoard = [...clearEmptyOnBoard];
	}


	boardWithSelected = [...tempBoard]

	const warning = moveWarning({ship, placesOtherShips})

	return {boardWithSelected, warning}
};