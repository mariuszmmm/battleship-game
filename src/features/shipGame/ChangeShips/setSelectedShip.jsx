export const setSelectedShip = ({board, selectedShip}) => {

	// let selectedShip = [];
	// selectedShip = fleetOnBoard.reduce((acc, cur) => {
	// 	return [...acc, ...cur.filter((item) => item.selected === true)]
	// }, [])

	const boardWithSelected = board.map((col) => col.map((row) =>
		selectedShip.some((shipItem) =>
			(row.ship?.place?.col === shipItem.place.col) &&
			(row.ship?.place?.row === shipItem.place.row)
		) ? ({...row, selected: true}) : ({...row, selected: false})
	))

	return boardWithSelected
};