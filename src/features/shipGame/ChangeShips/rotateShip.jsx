export const rotateShip = (shipCoords, step = 1) => {
	const minX = Math.min(...shipCoords.map(coord => coord.x));
	const maxX = Math.max(...shipCoords.map(coord => coord.x));
	const minY = Math.min(...shipCoords.map(coord => coord.y));
	const maxY = Math.max(...shipCoords.map(coord => coord.y));
	const sizeX = maxX - minX + 1;
	const sizeY = maxY - minY + 1;
	const cx = (minX + maxX) / 2;
	const cy = (minY + maxY) / 2;

	const rotatedShip = (shipCoords) => {
		let ship = [...shipCoords]

		for (let i = 0; i < step; i++) {
			ship = ship.map(({x, y}) => {
				const newX = cx - (y - cy) - (sizeX > sizeY && (sizeX + sizeY) % 2 === 1 ? 1 : 0);
				const newY = cy + (x - cx) - (sizeX < sizeY && (sizeX + sizeY) % 2 === 1 ? 1 : 0);

				return {x: Math.round(newX), y: Math.round(newY)};
			})
		}

		return ship;
	};

	return rotatedShip(shipCoords)
};