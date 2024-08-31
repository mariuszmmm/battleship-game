import {addInfoAboutNeighborToShip} from "./addInfoAboutNeighborToShip.jsx";
import {rotateShip} from "./rotateShip.jsx";

const toTop = (selectedShip, placesOtherShips) => {
	if (selectedShip.some((item) => item.place.row <= 1 ||
		placesOtherShips.some((places) => (places.row === item.place.row - 1) && (places.col === item.place.col))
	)) {

		return selectedShip
	} else {

		return selectedShip.map((item) =>
			({...item, place: {...item.place, row: item.place.row - 1}})
		)
	}
};

const toDown = (selectedShip, placesOtherShips) => {
	if (selectedShip.some((item) => item.place.row >= 10 ||
		placesOtherShips.some((places) => (places.row === item.place.row + 1) && (places.col === item.place.col))
	)) {

		return selectedShip
	} else {

		return selectedShip.map((item) =>
			({...item, place: {...item.place, row: item.place.row + 1}})
		)
	}
};

const toLeft = (selectedShip, placesOtherShips) => {
	if (selectedShip.some((item) => item.place.col <= 1 ||
		placesOtherShips.some((places) => (places.row === item.place.row) && (places.col === item.place.col - 1))
	)) {

		return selectedShip
	} else {

		return selectedShip.map((item) =>
			({...item, place: {...item.place, col: item.place.col - 1}})
		)
	}
};


const toRight = (selectedShip, placesOtherShips) => {
	if (selectedShip.some((item) => item.place.col >= 10 ||
		placesOtherShips.some((places) => (places.row === item.place.row) && (places.col === item.place.col + 1))
	)) {

		return selectedShip
	} else {

		return selectedShip.map((item) =>
			({...item, place: {...item.place, col: item.place.col + 1}})
		)
	}
};

const rotate = (selectedShip, placesOtherShips) => {
	const coordinateShip = () => {
		return selectedShip.map((item) => {
			return {x: item.place.col, y: item.place.row}
		})
	};

	const coordinateRotatedShip = rotateShip(coordinateShip());
	const isOnBorder = (coordinateRotatedShip.some((item) =>
		item.y > 10 || item.y < 1 ||
		item.x > 10 || item.x < 1));
	const collision = placesOtherShips.some((placeOtherShip) => (
		coordinateRotatedShip.some((item) => (
				placeOtherShip.row === item.y && placeOtherShip.col === item.x
			))
		))

	if (isOnBorder || collision) {
		console.log("Nie można wykonać obrotu, przesuń statek.")
		return selectedShip;
	}

	const rotatedShip = coordinateRotatedShip.map((coordinate) => {

		return {
			numberOfShip: selectedShip[0].numberOfShip,
			selected: true,
			place: {col: coordinate.x, row: coordinate.y}
		};
	});

	return addInfoAboutNeighborToShip(rotatedShip)
}

export const changesShip = (change, selectedShip, placesOtherShips) => {
	switch (change) {
		case "toTop":
			return toTop(selectedShip, placesOtherShips);
		case "toDown":
			return toDown(selectedShip, placesOtherShips);
		case "toLeft":
			return toLeft(selectedShip, placesOtherShips);
		case "toRight":
			return toRight(selectedShip, placesOtherShips);
		case "rotate":
			return rotate(selectedShip, placesOtherShips);
		default:
			return [];
	}
};