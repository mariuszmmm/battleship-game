import {itemNextToNeighbor} from "./itemNextToNeighbor.jsx";
import {rotateShip} from "./rotateShip.jsx";

const toTop = (selectedShip) => (
	selectedShip.map((item) =>
		({...item, place: {...item.place, row: item.place.row - 1}})
	));

const toDown = (selectedShip) => (
	selectedShip.map((item) =>
		({...item, place: {...item.place, row: item.place.row + 1}})
	));

const toLeft = (selectedShip) => (
	selectedShip.map((item) =>
		({...item, place: {...item.place, col: item.place.col - 1}})
	));

const toRight = (selectedShip) => (selectedShip.map((item) =>
	({...item, place: {...item.place, col: item.place.col + 1}})
));

const rotate = (selectedShip) => {
	const coordinateShip = () => {
		return selectedShip.map((item) => {
			return {x: item.place.col, y: item.place.row}
		})
	};
	const coordinateRotatedShip = rotateShip(coordinateShip());
	const rotatedShip = coordinateRotatedShip.map((coordinate) => (
		{
			numberOfShip: selectedShip[0].numberOfShip,
			place: {col: coordinate.x, row: coordinate.y},
			selected: true,
		}
	));

	return itemNextToNeighbor(rotatedShip)
}

export const changesShip = (change, selectedShip) => {
	switch (change) {
		case "toTop":
			return toTop(selectedShip);
		case "toDown":
			return toDown(selectedShip);
		case "toLeft":
			return toLeft(selectedShip);
		case "toRight":
			return toRight(selectedShip);
		case "rotate":
			return rotate(selectedShip);
		default:
			return [];
	}
};