import {rotateShip} from "./rotateShip.jsx";

export const setLockedMoves = ({ship, placesOtherShips}) => {
	const shipNumber = ship[0]?.numberOfShip;
	let lockedMoves = {
		toTop: false,
		toDown: false,
		toLeft: false,
		toRight: false,
		toRotate: false,
	};

	if (ship.some((item) => item.place.row <= 1 ||
		placesOtherShips.some((places) => (places.row === item.place.row - 1) && (places.col === item.place.col))
	)) {
		lockedMoves = {...lockedMoves, toTop: true}
	}

	if (ship.some((item) => item.place.row >= 10 ||
		placesOtherShips.some((places) => (places.row === item.place.row + 1) && (places.col === item.place.col))
	)) {
		lockedMoves = {...lockedMoves, toDown: true}
	}

	if (ship.some((item) => item.place.col <= 1 ||
		placesOtherShips.some((places) => (places.row === item.place.row) && (places.col === item.place.col - 1))
	)) {
		lockedMoves = {...lockedMoves, toLeft: true}
	}

	if (ship.some((item) => item.place.col >= 10 ||
		placesOtherShips.some((places) => (places.row === item.place.row) && (places.col === item.place.col + 1))
	)) {
		lockedMoves = {...lockedMoves, toRight: true};
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
		lockedMoves = {...lockedMoves, toRotate: true};
	}

	return {[shipNumber]: lockedMoves};
};