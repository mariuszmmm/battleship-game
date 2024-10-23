import {Coordinate} from "../../../types/types";

export const rotateShip = (shipCoordinates: Coordinate[], step = 1) => {
	const minX = Math.min(...shipCoordinates.map(coordinate => coordinate.x));
	const maxX = Math.max(...shipCoordinates.map(coordinate => coordinate.x));
	const minY = Math.min(...shipCoordinates.map(coordinate => coordinate.y));
	const maxY = Math.max(...shipCoordinates.map(coordinate => coordinate.y));
	const sizeX = maxX - minX + 1;
	const sizeY = maxY - minY + 1;
	const cx = (minX + maxX) / 2;
	const cy = (minY + maxY) / 2;

	const rotatedShip = (shipCoords: Coordinate[]) => {
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

	return rotatedShip(shipCoordinates);
};