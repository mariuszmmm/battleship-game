export const setShipSelect = ({board, fleetOnBoard}) => {


console.log(board)
	let selectedShip = fleetOnBoard.reduce((acc, cur) => {
		return [...acc, ...cur.filter((item) => item.selected === true)]
	}, [])

	console.log(selectedShip)

	return (
		board.map((col) => col.map((row) =>
			selectedShip.some((shipItem) =>
				(shipItem.place.col === row?.ship?.place?.col) &&
				(shipItem.place.row === row?.ship?.place?.row)
			) ? ({...row, selected: true}) :({...row, selected: false})
		))
	)
};