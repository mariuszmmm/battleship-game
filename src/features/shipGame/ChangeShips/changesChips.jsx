const changeToTop = (selectedShip, placesOtherShips) => {
	if (selectedShip.some((item) => item.place.row === 1 ||
		placesOtherShips.some((places) => (places.row === item.place.row - 1) && (places.col === item.place.col))
	)) {

		return selectedShip
	} else {

		return selectedShip.map((item) =>
			({...item, place: {...item.place, row: item.place.row - 1}})
		)
	}
};

const changeToDown = (selectedShip, placesOtherShips) => {
	if (selectedShip.some((item) => item.place.row === 10 ||
		placesOtherShips.some((places) => (places.row === item.place.row + 1) && (places.col === item.place.col))
	)) {

		return selectedShip
	} else {

		return selectedShip.map((item) =>
			({...item, place: {...item.place, row: item.place.row + 1}})
		)
	}
};

const changeToLeft = (selectedShip, placesOtherShips) => {
	if (selectedShip.some((item) => item.place.col === 1 ||
		placesOtherShips.some((places) => (places.row === item.place.row) && (places.col === item.place.col - 1))
	)) {

		return selectedShip
	} else {

		return selectedShip.map((item) =>
			({...item, place: {...item.place, col: item.place.col - 1}})
		)
	}
};


const changeToRight = (selectedShip, placesOtherShips) => {
	if (selectedShip.some((item) => item.place.col === 10 ||
		placesOtherShips.some((places) => (places.row === item.place.row) && (places.col === item.place.col + 1))
	)) {

		return selectedShip
	} else {

		return selectedShip.map((item) =>
			({...item, place: {...item.place, col: item.place.col + 1}})
		)
	}
};

export const changesShip = (change, selectedShip, placesOtherShips) => {
	switch (change) {
		case "toTop":
			return changeToTop(selectedShip, placesOtherShips);
		case "toDown":
			return changeToDown(selectedShip, placesOtherShips);
		case "toLeft":
			return changeToLeft(selectedShip, placesOtherShips);
		case "toRight":
			return changeToRight(selectedShip, placesOtherShips);
		default:
			return [];
	}
};