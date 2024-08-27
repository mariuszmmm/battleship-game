export const moveShip = ({board,selectedShip, movedShip}) => {
console.log(selectedShip)
		console.log(movedShip)

		const boardWithOutSelectedShip = board.map((col) => col.map((row) =>
		selectedShip.some((shipItem) => {
			console.log((row.ship?.place?.col === shipItem.place.col) &&
				(row.ship?.place?.row === shipItem.place.row))
			return (
			(row.ship?.place?.col === shipItem.place.col) &&
			(row.ship?.place?.row === shipItem.place.row)
			)
			}

			) ? ({...row, ship: {}, cell: "empty", selected: false})
			:
			({...row})
	))

		let boardWithMoved = []
			 boardWithMoved = boardWithOutSelectedShip.map((col) =>
			col.map((cell) => {
				let foundItem = movedShip.find((shipItem) =>
					((shipItem.place.row === cell.row.number) &&
						(shipItem.place.col === cell.col.number)));
				return foundItem
					?
					({...cell, ship: foundItem, cell: "ship", selected: true})
					:
					({...cell, selected: false})
			})
			)



	return boardWithMoved
}
	;