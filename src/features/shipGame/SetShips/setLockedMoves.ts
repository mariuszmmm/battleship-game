import {rotateShip} from "./rotateShip";
import {LockedMovesItem, ShipItem} from "../../../types/types";

interface SetLockedMovesProps {
	ship: ShipItem[];
	placesOtherShips: ShipItem["place"][];
}

export const setLockedMoves = ({ship, placesOtherShips}: SetLockedMovesProps) => {
	const shipNumber = ship.length > 0 ? ship[0].numberOfShip : undefined;
	let lockedMovesItem: LockedMovesItem = {
		toTop: false,
		toDown: false,
		toLeft: false,
		toRight: false,
		rotate: false,
	};

	if (ship.some((item) => item.place.row <= 1 ||
		placesOtherShips.some((places) => (places.row === item.place.row - 1) && (places.col === item.place.col))
	)) {
		lockedMovesItem = {...lockedMovesItem, toTop: true}
	}

	if (ship.some((item) => item.place.row >= 10 ||
		placesOtherShips.some((places) => (places.row === item.place.row + 1) && (places.col === item.place.col))
	)) {
		lockedMovesItem = {...lockedMovesItem, toDown: true}
	}

	if (ship.some((item) => item.place.col <= 1 ||
		placesOtherShips.some((places) => (places.row === item.place.row) && (places.col === item.place.col - 1))
	)) {
		lockedMovesItem = {...lockedMovesItem, toLeft: true}
	}

	if (ship.some((item) => item.place.col >= 10 ||
		placesOtherShips.some((places) => (places.row === item.place.row) && (places.col === item.place.col + 1))
	)) {
		lockedMovesItem = {...lockedMovesItem, toRight: true};
	}

	const coordinateShip = () => {
		return ship.map((item) => {
			return {x: item.place.col, y: item.place.row}
		});
	};

	const coordinateRotatedShip = rotateShip(coordinateShip());
	const collision = placesOtherShips.some((placeOtherShip) => (
		coordinateRotatedShip.some((item) => (
			placeOtherShip.row === item.y && placeOtherShip.col === item.x
		))
	));

	const isOnBorder = (coordinateRotatedShip.some((item) =>
		item.y > 10 || item.y < 1 ||
		item.x > 10 || item.x < 1));

	if (collision || isOnBorder) {
		lockedMovesItem = {...lockedMovesItem, rotate: true};
	}

	return shipNumber ? {[shipNumber]: lockedMovesItem} : {};
};