export const getShot = ({boardToShots, board, shotInCell}) => {
	let hitCell = {};

	let boardAfterShot = board.map((col) => col.map((cell) => {
			if (cell.id === shotInCell && cell.shipState !== "sunk") {
				if (cell.cell === "ship") {
					hitCell = {...cell}
					return {...cell, shipState: "hit"}
				} else {
					return {...cell, target: "missed"}
				}
			} else {
				return {...cell}
			}
		}
	));

	const {ship: hitShip} = hitCell;

	let numberOfSunkElements = 0
	boardAfterShot.forEach((col) => col.forEach((cell) => {
		if (cell.cell !== "ship") return;
		if (cell.ship.numberOfShip === hitShip?.numberOfShip && cell.shipState === "hit") {
			++numberOfSunkElements
		}
	}));

	const isSunkShip = numberOfSunkElements === hitShip?.size;

	if (isSunkShip) {
		boardAfterShot = boardAfterShot.map((col) => col.map((cell) => {
			if (cell.cell === "ship" && cell.ship?.numberOfShip === hitShip?.numberOfShip) {
				return {...cell, shipState: "sunk"}
			} else {
				return {...cell}
			}
		}));
	}

	let boardToShotsAfterShot = boardToShots.map((col) => col.map((cell) =>
		cell.id === shotInCell
			?
			(hitShip ?
				{...hitCell, target: "hit", cellState: null}
				:
				{...cell, target: "missed", cellState: null})
			:
			{...cell}
	));

	if (hitShip && isSunkShip) {
		boardToShotsAfterShot = boardToShotsAfterShot.map((col) => col.map((cell) =>
			cell.ship?.numberOfShip === hitShip?.numberOfShip
				?
				{...cell, target: null, shipState: "sunk"}
				:
				{...cell})
		)
	}

	return {boardAfterShot, boardToShotsAfterShot}
};