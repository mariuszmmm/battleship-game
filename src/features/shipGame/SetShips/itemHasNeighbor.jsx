export const itemHasNeighbor = (newShip) => (
	newShip.map((item) => {
		let top = false;
		let right = false;
		let bottom = false;
		let left = false;

		if (newShip.some((i) =>
			item.place.col === i.place.col && item.place.row === i.place.row + 1)) {
			top = true;
		}
		if (newShip.some((i) =>
			item.place.col === i.place.col - 1 && item.place.row === i.place.row)) {
			right = true;
		}
		if (newShip.some((i) =>
			item.place.col === i.place.col && item.place.row === i.place.row - 1)) {
			bottom = true;
		}
		if (newShip.some((i) =>
			item.place.col === i.place.col + 1 && item.place.row === i.place.row)) {
			left = true;
		}

		return {
			...item,
			neighbors: {top, right, bottom, left,}
		}
	})
);