import {changesShip} from "./changesShips.jsx";
import {setPlacesReserved, warningsAroundCell} from "./functionsCellActions.jsx";

export const moveShip = ({board, change, mayTouch}) => {

		let selectedShip = [];
		let placesOfShipWithoutSelected = [];

		board.forEach((col) => col.forEach((cell) => {
			if (cell.ship?.selected) {
				selectedShip = [...selectedShip, cell.ship]
			}
			if (cell.cell === "ship" && !cell.ship?.selected) {
				placesOfShipWithoutSelected = [...placesOfShipWithoutSelected, cell.ship.place]
			}
		}))

		const boardWithOutSelectedShip = board.map((col) => col.map((cell) =>
			selectedShip.some((shipItem) => {
					return (
						(cell.col.number === shipItem.place.col) &&
						(cell.row.number === shipItem.place.row)
					)
				}
			) ? ({...cell, ship: null, cell: "empty"})
				:
				({...cell})
		))

		const movedShip = changesShip(change, selectedShip)
		let boardWithMoved = []
		boardWithMoved = boardWithOutSelectedShip.map((col) =>
			col.map((cell) => {
				let foundItem = movedShip.find((shipItem) =>
					((cell.row.number === shipItem.place.row) &&
						(cell.col.number === shipItem.place.col)));

				return foundItem
					?
					({...cell, ship: foundItem, cell: "ship"})
					:
					({...cell})
			})
		);

		let tempBoard = [...boardWithMoved];
		if (!mayTouch) {
			let allShip = [];

			const clearEmptyOnBoard = tempBoard.map((col) => col.map((cell) => {
				if (cell.cell === "ship") {
					allShip = [...allShip, cell.ship]

					return {...cell}
				} else {

					return {...cell, cell: "empty"}
				}
			}))
			tempBoard = [...clearEmptyOnBoard];

			tempBoard.forEach((col) => col.forEach((cell) => {
				if (cell.cell === "ship") {
					const boardWithReserved = setPlacesReserved(tempBoard, cell, "reserved");
					tempBoard = [...boardWithReserved]
				}
			}))

			const warningsForShipNumbers = warningsAroundCell(allShip, tempBoard);
			let boardWithReserved = []
			tempBoard.forEach((col) => col.forEach((cell) => {
				if (cell.cell === "ship" && warningsForShipNumbers.includes(cell.ship.numberOfShip)) {
					// console.log(warningsForShipNumbers, tempBoard, cell)

					boardWithReserved = setPlacesReserved(tempBoard, cell, "warning")
					tempBoard = [...boardWithReserved];
				}
			}))
			boardWithMoved = [...tempBoard]
		}

		selectedShip = [];
		let isWarning = false;
		boardWithMoved.forEach((col) => col.forEach((cell) => {
			if (cell.ship?.selected) selectedShip = [...selectedShip, cell.ship]
			if (cell.cell === "warning") {
				isWarning = true;
			}
		}))


		return {selectedShip, placesOfShipWithoutSelected, movedShip, boardWithMoved, isWarning}
	}
;