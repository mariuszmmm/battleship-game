export const shipsAvailable = {
	firstTypeShip: {
		models: [[{col: 1, row: 1}]],
	},
	secondTypeShip: {
		models: [{col: 1, row: 1}, {col: 1, row: 2}]
	},
	thirdTypeShip: {
		models: [
			[{col: 1, row: 1}, {col: 1, row: 2}, {col: 1, row: 3}],
			[{col: 1, row: 1}, {col: 1, row: 2}, {col: 2, row: 2}]
		]
	},
	fourthTypeShips: {
		models: [
			[{col: 1, row: 1}, {col: 1, row: 2}, {col: 1, row: 3}, {col: 1, row: 4}],
			[{col: 1, row: 1}, {col: 1, row: 2}, {col: 2, row: 2}, {col: 2, row: 3}],
			[{col: 1, row: 1}, {col: 1, row: 2}, {col: 2, row: 1}, {col: 2, row: 2}],
		]
	},
	fifthTypeShips: {
		models: [
			[{col: 1, row: 1}, {col: 1, row: 2}, {col: 1, row: 3}, {col: 1, row: 4}, {col: 1, row: 5}],
			[{col: 1, row: 1}, {col: 1, row: 2}, {col: 1, row: 3}, {col: 2, row: 1}, {col: 2, row: 2}],
			[{col: 1, row: 1}, {col: 1, row: 2}, {col: 2, row: 1}, {col: 2, row: 2}, {col: 2, row: 3}],
			[{col: 1, row: 1}, {col: 1, row: 2}, {col: 2, row: 2}, {col: 2, row: 3}, {col: 2, row: 4}],
			[{col: 1, row: 1}, {col: 1, row: 2}, {col: 1, row: 3}, {col: 2, row: 3}, {col: 2, row: 4}],
		]
	}
};


export const randomShips = (board, setBoard) => {
	const random = (max) => Math.floor(Math.random() * max + 1);
	let newBoard = [];
	const buildSchip = () => {
		const ship = [{col: random(10), row: random(10)}];

		ship.forEach((shipItem) => {

			const item = board.map((col) => col.map((cell) => {
				if (cell.col.number === shipItem.col && cell.row.number === shipItem.row && cell.cell === "empty") {
					console.log(cell.id)
					return {...cell, cell: "ship"};
				} else {
					return cell;
				}
			}));

			console.log(item)
		newBoard = item;
		});

	return newBoard
}
	setBoard(buildSchip())
};