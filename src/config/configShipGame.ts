import {ShipsAvailable, ShipVersions} from "../types/types";

export const shipsAvailable: ShipsAvailable = {
	firstTypeShips: [
		[{x: 1, y: 1}]
	],
	secondTypeShips: [
		[{x: 1, y: 1}, {x: 1, y: 2}],
	],
	thirdTypeShips: [
		[{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}],
		[{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 1}],
	],
	fourthTypeShips: [
		[{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}],
		[{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 2, y: 3}],
		[{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 1}, {x: 2, y: 2}],
		[{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 3, y: 2}],
		[{x: 1, y: 2}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}],
	],
	fifthTypeShips: [
		[{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}, {x: 1, y: 5}],
		[{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 2, y: 1}, {x: 2, y: 2}],
		[{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4}],
		[{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}, {x: 2, y: 4}],
		[{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 4, y: 2}],
		[{x: 2, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 2, y: 3}],
		[{x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 3, y: 3}],
		[{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 2, y: 1}, {x: 2, y: 3}],
		[{x: 1, y: 2}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 3, y: 3}],
	],
};

export const shipVersions_1: ShipVersions = {
	firstTypeShips: 1,
	secondTypeShips: 1,
	thirdTypeShips: 1,
	fourthTypeShips: 1,
	fifthTypeShips: 1,
};

export const shipVersions_2: ShipVersions = {
	firstTypeShips: 2,
	secondTypeShips: 2,
	thirdTypeShips: 1,
	fourthTypeShips: 1,
	fifthTypeShips: 1,
};

export const shipVersions_3: ShipVersions = {
	firstTypeShips: 4,
	secondTypeShips: 3,
	thirdTypeShips: 2,
	fourthTypeShips: 1,
};

export const rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;
export const cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const;