import {itemHasNeighbor} from "./itemHasNeighbor.js";
import {rotateShip} from "./rotateShip.js";
import {ShipItem, ChangeShipPlace} from "../../../types/types";

const toTop = (selectedShip: ShipItem[]): ShipItem[] => (
	selectedShip.map((item) =>
		({...item, place: {...item.place, row: item.place.row - 1}, selected: true,})
	));

const toDown = (selectedShip: ShipItem[]): ShipItem[] => (
	selectedShip.map((item) =>
		({...item, place: {...item.place, row: item.place.row + 1}, selected: true,})
	));

const toLeft = (selectedShip: ShipItem[]): ShipItem[] => (
	selectedShip.map((item) =>
		({...item, place: {...item.place, col: item.place.col - 1}, selected: true,})
	));

const toRight = (selectedShip: ShipItem[]): ShipItem[] => (selectedShip.map((item) =>
	({...item, place: {...item.place, col: item.place.col + 1}, selected: true,})
));

const rotate = (selectedShip: ShipItem[]): ShipItem[] => {
	const coordinateShip = () => {
		return selectedShip.map((item) => {
			return {x: item.place.col, y: item.place.row}
		})
	};
	const coordinateRotatedShip = rotateShip(coordinateShip());
	const rotatedShip = coordinateRotatedShip.map((coordinate) => (
		{
			numberOfShip: selectedShip[0].numberOfShip,
			sizeOfShip: selectedShip[0].sizeOfShip,
			place: {col: coordinate.x, row: coordinate.y},
			selected: true,
		}
	));

	return itemHasNeighbor(rotatedShip)
}

export const changesShip = (change: ChangeShipPlace, selectedShip: ShipItem[]) => {
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
			console.error("Error in changesShip");
			return selectedShip;
	}
};