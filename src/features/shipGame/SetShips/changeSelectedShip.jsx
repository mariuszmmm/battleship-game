import {setLockedMoves} from "./setLockedMoves.jsx";

export const changeSelectedShip = ({board, number, selectedShip}) => {
	let boardWithSelected, newSelectedShip, placesOtherShips;

		board.forEach((col) => col.forEach((cell) => {
			if (cell.cell !== "ship" ||
				cell.ship.numberOfShip !== number
			) return;
			if (
				selectedShip.length === 0 ||
				cell.ship.numberOfShip !== selectedShip[0].numberOfShip
			) {
				newSelectedShip = [...newSelectedShip, cell.ship]
			}
		}));

		boardWithSelected = board.map((col) => col.map((cell) => {
			return newSelectedShip.find((shipItem) =>
				(cell.col.number === shipItem.place.col &&
					cell.row.number === shipItem.place.row))
				?
				{...cell, ship: {...cell.ship, selected: true}}
				:
				{...cell, ship: {...cell.ship, selected: false}}
		}))

		boardWithSelected.forEach((col) => col.forEach((cell) => {
			if (cell.cell === "ship" && !cell.ship?.selected) {
				placesOtherShips = [...placesOtherShips, cell.ship.place]
			}
		}));

		const lockedMoves = setLockedMoves({ship: newSelectedShip, placesOtherShips})

		return {boardWithSelected, newSelectedShip, lockedMoves}
	}
;