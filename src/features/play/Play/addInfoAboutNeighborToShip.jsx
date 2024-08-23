export const addInfoAboutNeighborToShip = (newShip) =>
	(newShip.map((item) => {
			let hasNeighborTop = false;
			let hasNeighborRight = false;
			let hasNeighborBottom = false;
			let hasNeighborLeft = false;

			if (newShip.some((i) => item.col === i.col && item.row === i.row + 1)) {
				hasNeighborTop = true;
			}
			if (newShip.some((i) => item.col === i.col - 1 && item.row === i.row)) {
				hasNeighborRight = true;
			}
			if (newShip.some((i) => item.col === i.col && item.row === i.row - 1)) {
				hasNeighborBottom = true;
			}
			if (newShip.some((i) => item.col === i.col + 1 && item.row === i.row)) {
				hasNeighborLeft = true;
			}

			return {
				...item,
				hasNeighborTop,
				hasNeighborRight,
				hasNeighborBottom,
				hasNeighborLeft
			};
		})
	);