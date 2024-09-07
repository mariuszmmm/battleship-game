import {ShipsBoardWrapper, BoardCell, ColName, RowName, ShipItem, Empty} from "./styled.jsx"
import {useDispatch, useSelector} from "react-redux";
import {
	selectState,
	setShipSelectedNumber,
	setTargetedCell
} from "../../features/shipGame/shipGameSlice.jsx"

// eslint-disable-next-line react/prop-types
export const ShipsBoard = ({board, activeBoard}) => {
	const dispatch = useDispatch();
	const state = useSelector(selectState);

	return (
		<ShipsBoardWrapper>
			{/* eslint-disable-next-line react/prop-types */}
			{board.map((col, colIndex) =>
				col.map((cell, cellIndex) =>
					<BoardCell key={cell.id} $ship={cell.cell === "ship"}
					           onClick={() => dispatch(setTargetedCell({cell, board, activeBoard}))}
					           $targeted={state === "playGame" && cell.cell === "targeted"}
					>
						{cellIndex === 0 && <ColName>{cell.col.name}</ColName>}
						{colIndex === 0 && <RowName>{cell.row.name}</RowName>}
						{cell.cell === "ship" &&
							<ShipItem key={cell?.id}
							          $top={cell.ship?.neighbors.top}
							          $right={cell.ship?.neighbors.right}
							          $left={cell.ship?.neighbors.left}
							          $bottom={cell.ship?.neighbors.bottom}
							          onClick={() => dispatch(setShipSelectedNumber({number: cell.ship.numberOfShip}))}
							          $selected={state === "setShips" && cell.ship?.selected}
							/>}
						{cell.cell !== "ship" &&
							<Empty key={cell?.id}
							       $reserved={cell.cell === "reserved"}
							       $warning={cell.cell === "warning"}
							/>}
					</BoardCell>))}
		</ShipsBoardWrapper>
	)
};