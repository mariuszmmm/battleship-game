export const getShot = ({boardToShots, board, shot}) => {
	let hitCell = null;

	const boardAfterShot = board.map((col) => col.map((cell) => {
			if (cell.id === shot) {
				if (cell.cell === "ship") {
					hitCell = cell
					return {...cell, target: "hit"}
				} else {
					return {...cell, target: "missed"}
				}
			} else {
				return {...cell}
			}
		}
	))

	const boardToShotsAfterShot = boardToShots.map((col) => col.map((cell) =>
		cell.id === shot
			?
			(hitCell ?
				{...hitCell, ship: {...hitCell.ship, neighbors: {}}, target: "hit"}
				:
				{...cell, target: "missed"})
			:
			{...cell}
	))

	return {boardToShotsAfterShot, boardAfterShot}
};