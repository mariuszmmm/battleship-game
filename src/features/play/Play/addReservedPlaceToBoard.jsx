export const addReservedPlaceToBoard = (tempBoard, cell) => (
	tempBoard.map((col_) => col_.map((row_) => {
			if (
				((row_.col.number === cell.col.number + 1 &&
						(row_.row.number === cell.row.number)
					) ||
					(row_.col.number === cell.col.number &&
						(row_.row.number === cell.row.number + 1)
					) ||
					(row_.col.number === cell.col.number - 1 &&
						(row_.row.number === cell.row.number)
					) ||
					(row_.col.number === cell.col.number &&
						(row_.row.number === cell.row.number - 1)
					) ||
					(row_.col.number === cell.col.number + 1 &&
						(row_.row.number === cell.row.number + 1)
					) ||
					(row_.col.number === cell.col.number - 1 &&
						(row_.row.number === cell.row.number - 1)
					) ||
					(row_.col.number === cell.col.number - 1 &&
						(row_.row.number === cell.row.number + 1)
					) ||
					(row_.col.number === cell.col.number + 1) &&
					(row_.row.number === cell.row.number - 1)) &&
				row_.cell === "empty") {
				return {...row_, cell: "reserved"}
			} else {
				return row_
			}
		}
	))
);
