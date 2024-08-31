export const setSelectedShip = ({board, selectedShip}) => (
	board.map((col) => col.map((row) =>
		selectedShip.some((shipItem) =>
			(row.ship?.place?.col === shipItem.place.col) &&
			(row.ship?.place?.row === shipItem.place.row)
		) ? ({...row, selected: true}) : ({...row, selected: false})
	))
);