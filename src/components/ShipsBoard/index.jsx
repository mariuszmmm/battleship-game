import {ShipsBoardWrapper, BoardCell, ColName, RowName, ShipItem, Empty} from "./styled.jsx"
import {useDispatch, useSelector} from "react-redux";
import {
	selectState,
	setShipSelectedNumber,
	setTarget
} from "../../features/shipGame/shipGameSlice.jsx"
import {CrossHairsIcon, X_markIcon, FireIcon} from "../Icons/index.jsx";

// eslint-disable-next-line react/prop-types
export const ShipsBoard = ({board, player}) => {
	const dispatch = useDispatch();
	const state = useSelector(selectState);
	return (
		<ShipsBoardWrapper>
			{/* eslint-disable-next-line react/prop-types */}
			{board.map((col, colIndex) =>
				col.map((cell, cellIndex) =>
					<BoardCell key={cell.id} $ship={cell.cell === "ship"}
					           onClick={() => dispatch(setTarget({target: cell.id, player}))}
					           $targeted={state === "playGame" && cell.cellState === "set"}
					>
						{cellIndex === 0 && <ColName>{cell.col.name}</ColName>}
						{colIndex === 0 && <RowName>{cell.row.name}</RowName>}
						{cell.cell === "ship" &&
							<ShipItem key={cell?.id}
							          $top={(cell.ship?.neighbors.top && cell.target !== "hit"
									          && cell.target !== null) ||
								          (cell.ship?.neighbors.top && cell.shipState === "sunk")}
							          $right={(cell.ship?.neighbors.right && cell.target !== "hit"
									          && cell.target !== null) ||
								          (cell.ship?.neighbors.right && cell.shipState === "sunk")}
							          $left={(cell.ship?.neighbors.left && cell.target !== "hit"
									          && cell.target !== null) ||
								          (cell.ship?.neighbors.left && cell.shipState === "sunk")}
							          $bottom={(cell.ship?.neighbors.bottom && cell.target !== "hit"
									          && cell.target !== null) ||
								          (cell.ship?.neighbors.bottom && cell.shipState === "sunk")}
							          onClick={() => dispatch(setShipSelectedNumber({number: cell.ship.numberOfShip}))}
							          $selected={state === "setShips" && cell.ship?.selected}
							          $sunk={cell.shipState === "sunk"}
							/>}
						{cell.cell !== "ship" &&
							<Empty key={cell?.id}
							       $reserved={cell.cell === "reserved"}
							       $warning={cell.cell === "warning"}
							/>}
						{cell.cellState === "set" && <CrossHairsIcon/>}
						{(cell.target === "hit" || cell.shipState === "hit") && cell.shipState !== "sunk"
							&& <FireIcon/>}
						{(cell.target === "missed" || cell.shipState === "sunk") && <X_markIcon $board/>}
					</BoardCell>))}
		</ShipsBoardWrapper>
	)
};