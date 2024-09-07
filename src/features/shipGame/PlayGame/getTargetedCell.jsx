export const getTargetedCell = ({board, targetedCell}) => {
	return board.map((col) => col.map((cell) =>
		cell.id === targetedCell.id
			?
			{...cell, cell: "targeted"}
			:
			{...cell}
	))
};