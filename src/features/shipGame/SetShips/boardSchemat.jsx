export const boardSchemat = () => {
	const row = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

	return (col.map((colItem, colIndex) =>
			row.map((rowItem, rowIndex) =>
				({
					id: `${colItem + rowItem}`,
					col: {number: colIndex + 1, name: colItem},
					row: {number: rowIndex + 1, name: rowItem},
					cell: "empty",
					ship: null
				})))
	);
};