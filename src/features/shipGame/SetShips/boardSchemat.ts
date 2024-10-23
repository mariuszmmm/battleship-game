import {Board} from "../../../types/types";
import {rows, cols} from "../../../config/configShipGame";

export const boardSchemat = (): Board =>
	cols.map((colItem, colIndex) =>
		rows.map((rowItem, rowIndex) => (
			{
				id: `${colItem}${rowItem}`,
				col: {number: colIndex + 1, name: colItem},
				row: {number: rowIndex + 1, name: rowItem},
				cell: "empty",
				ship: null,
			}
		))
	);