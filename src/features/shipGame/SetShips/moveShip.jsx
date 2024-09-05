import {changesShip} from "./changesShip.jsx";
import {setPlacesAroundCell, warningsAroundCell} from "./changesOnBoard.jsx";
import {setLockedMoves} from "./setLockedMoves.jsx";

export const moveShip = ({board, change, mayTouch, selectedShip}) => {
		let newSelectedShip = [...selectedShip];
		let boardWithMoved = [];
		let wrongSettingOfShips = false;
		let placesOtherShips = [];

		board.forEach((col) => col.forEach((cell) => {
			if (cell.cell === "ship" && !cell.ship?.selected) {
				placesOtherShips = [...placesOtherShips, cell.ship.place]
			}
		}))

		const boardWithOutSelectedShip = board.map((col) => col.map((cell) =>
			newSelectedShip.some((shipItem) => {
					return (
						(cell.col.number === shipItem.place.col) &&
						(cell.row.number === shipItem.place.row)
					)
				}
			) ? ({...cell, ship: null, cell: "empty"})
				:
				({...cell})
		))

		const movedShip = changesShip(change, newSelectedShip);

		boardWithMoved = boardWithOutSelectedShip.map((col) =>
			col.map((cell) => {
				let foundItem = movedShip.find((shipItem) =>
					((cell.row.number === shipItem.place.row) &&
						(cell.col.number === shipItem.place.col)));

				return foundItem ?
					({...cell, ship: foundItem, cell: "ship"}) : ({...cell});
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
				if (cell.cell !== "ship") return
				const boardWithReserved = setPlacesAroundCell(tempBoard, cell, "reserved");
				tempBoard = [...boardWithReserved]
			}))

			const warningsForShipNumbers = warningsAroundCell(allShip, tempBoard);
			let boardWithReserved = []
			tempBoard.forEach((col) => col.forEach((cell) => {
				if (cell.cell !== "ship" || !warningsForShipNumbers.includes(cell.ship.numberOfShip)) return
				boardWithReserved = setPlacesAroundCell(tempBoard, cell, "warning")
				tempBoard = [...boardWithReserved];
			}))
			boardWithMoved = [...tempBoard]
		}

		newSelectedShip = [];
		boardWithMoved.forEach((col) => col.forEach((cell) => {
			if (cell.ship?.selected) newSelectedShip = [...newSelectedShip, cell.ship]
			if (cell.cell === "warning") {
				wrongSettingOfShips = true;
			}
		}))

		const lockedMoves = setLockedMoves({ship: movedShip, placesOtherShips})

		return {newSelectedShip, boardWithMoved, lockedMoves, wrongSettingOfShips}
	}
;