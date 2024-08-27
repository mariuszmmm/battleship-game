import {changesShip} from "./changesChips.jsx";

export const moveShip = ({board, change}) => {

		let selectedShip = [];
		let placesOtherShips = [];

		board.forEach((col) => col.forEach((cell) => {
			if (cell.selected) selectedShip = [...selectedShip, cell.ship];
			if (cell.cell === "ship" && !cell.selected) {
				placesOtherShips = [...placesOtherShips, cell.ship.place]
			}
		}))

		const boardWithOutSelectedShip = board.map((col) => col.map((cell) =>
			selectedShip.some((shipItem) => {
					return (
						(cell.col.number === shipItem.place.col) &&
						(cell.row.number === shipItem.place.row)
					)
				}
			) ? ({...cell, ship: null, cell: "empty", selected: false})
				:
				({...cell})
		))

		const movedShip = changesShip(change, selectedShip, placesOtherShips)
		// console.log(change)
		// console.log(selectedShip)
		console.log(movedShip)
		let boardWithMoved = []
		boardWithMoved = boardWithOutSelectedShip.map((col) =>
			col.map((cell) => {
				let foundItem = movedShip.find((shipItem) =>
					((cell.row.number === shipItem.place.row) &&
						(cell.col.number === shipItem.place.col)));

				return foundItem
					?
					({...cell, ship: foundItem, cell: "ship", selected: true})
					:
					({...cell, selected: false})
			})
		)

		selectedShip = [];
		board.forEach((col) => col.forEach((cell) => {
			if (cell.selected) selectedShip = [...selectedShip, cell.ship]
		}))


		return {selectedShip, movedShip, boardWithMoved}
	}
;