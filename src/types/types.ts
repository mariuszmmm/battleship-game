import {cols, rows} from "../config/configShipGame";

type Row = typeof rows[number];
type Col = typeof cols[number];
export type CellId = `${Col}${Row}`;

export type Coordinate = {
	x: number;
	y: number
};

export type ShipsAvailable = {
	firstTypeShips: Coordinate[][];
	secondTypeShips: Coordinate[][];
	thirdTypeShips: Coordinate[][];
	fourthTypeShips: Coordinate[][];
	fifthTypeShips: Coordinate[][];
};

export type ShipVersions = { [key in keyof ShipsAvailable]?: number };

export type ShipSize = "size1" | "size2" | "size3" | "size4" | "size5";

export type Player = "firstPlayer" | "secondPlayer" | null;

export type Parameters = {
	gameMode: "compVsPlayer" | "compVsComp" | "playerVsPlayer";
	difficultyLevel: "easy" | "medium" | "difficult";
	numberOfShips: 5 | 7 | 10;
	numberOfShots: number;
	shotsEqualShips: boolean;
	mayTouch: boolean;
	bonus: boolean;
	sound: boolean;
	notStandardShips: boolean;
}

export type StateOfPlayers = {
	board: Board;
	boardToShots: Board;
	fleet: Fleet | {};
	numberOfShips: number;
	numberOfShots: number;
	target: CellId | null;
	shotInCell: CellId | null;
}

export type Results = {
	wygrana?: number;
	przegrana?: number;
};

export type Fleet = {
	[key in ShipSize]: number[];
};

export type Cell = {
	id: CellId;
	col: { number: number; name: string };
	row: { number: number; name: string };
	cell: "empty" | "ship" | "hit" | "miss" | "warning" | "reserved";
	ship: ShipItem | null;
	cellState?: "set" | null;
	shipState?: "sunk" | "hit";
	target?: "hit" | "missed" | null;
};

export type Board = Cell[][];

export type ShipItem = {
	numberOfShip: number;
	sizeOfShip: number;
	neighbors?: { top: boolean, right: boolean, bottom: boolean, left: boolean };
	place: { col: number, row: number };
	selected: boolean;
};

export type SelectedShip = { number: ShipItem["numberOfShip"] | null; ship: ShipItem[] };

export type ChangeShipPlace = "toTop" | "toDown" | "toLeft" | "toRight" | "rotate";

export type LockedMovesItem = {
	[key in ChangeShipPlace]: boolean;
};

export type LockedMoves = {
	[key in ShipItem["numberOfShip"]]: LockedMovesItem;
};

export type SettingShips = {
	selectedShip: SelectedShip;
	changeShipPlace: ChangeShipPlace | null;
	lockedMoves: LockedMoves | {};
	wrongSettingOfShips: boolean;
	approvedSetting: boolean;
};