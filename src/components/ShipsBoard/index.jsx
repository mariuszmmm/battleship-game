import {ShipsBoardWrapper, BoardCell, ColName, RowName, ShipItem, Empty} from "./styled.jsx"
import {useDispatch, useSelector} from "react-redux";
import {
	selectActivePlayer,
	selectFirstPlayerShotInCell,
	selectFirstPlayerTarget,
	selectGameMode,
	setShipSelectedNumber,
	setTarget,
	selectFirstPlayerNumberOfShots,
	selectSecondPlayerNumberOfShots
} from "../../features/shipGame/shipGameSlice.jsx"
import {CrossHairsIcon, XMarkIcon, FireIcon, CircleIcon} from "../Icons/index.jsx";
import {useLocation} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ShipsBoard = ({board, player, toLeft}) => {
	const dispatch = useDispatch();
	const target = useSelector(selectFirstPlayerTarget);
	const shotInCell = useSelector(selectFirstPlayerShotInCell)
	const gameMode = useSelector(selectGameMode);
	const activePlayer = useSelector(selectActivePlayer);
	const firstPlayerNumberOfShots = useSelector(selectFirstPlayerNumberOfShots);
	const secondPlayerNumberOfShots = useSelector(selectSecondPlayerNumberOfShots);
	const {pathname} = useLocation();

	const onClickHandler = (cell) => {
		const numberOfShots = (activePlayer === "firstPlayer" ? firstPlayerNumberOfShots : secondPlayerNumberOfShots);
		if ((target && shotInCell) || gameMode === "compVsComp" || (!numberOfShots && activePlayer && pathname === "/playGame")) return;
		dispatch(setTarget({target: cell.id, player}))
		if (cell.cell === "ship") {
			dispatch(setShipSelectedNumber({number: cell.ship.numberOfShip}))
		}
	};

	return (
		<ShipsBoardWrapper $toLeft={toLeft}>
			{/* eslint-disable-next-line react/prop-types */}
			{board.map((col, colIndex) => col.map((cell, cellIndex) =>
				<BoardCell key={cell.id}
				           onClick={() => onClickHandler(cell)}
				           $compVsComp={gameMode === "compVsComp"}
				           $hovered={pathname === "/playGame" && activePlayer === player && firstPlayerNumberOfShots > 0}
				           $targeted={pathname === "/playGame" && cell.cellState === "set"}
				           $targetedLine={pathname === "/playGame" &&
					           (cell.col.name === target?.charAt(0) ||
						           cell.row.name === target?.charAt(1) + target?.charAt(2))}
				>
					{cellIndex === 0 && <ColName>{cell.col.name}</ColName>}
					{colIndex === 0 && <RowName>{cell.row.name}</RowName>}
					{cell.cell === "ship" &&
						<ShipItem key={cell?.id}
						          $sunk={cell.shipState === "sunk"}
						          $compVsComp={gameMode === "compVsComp"}
						          $selected={pathname === "/setShips" && cell.ship?.selected}
						          $top={(cell.ship?.neighbors.top && cell.target !== "hit" && cell.target !== null) ||
							          (cell.ship?.neighbors.top && cell.shipState === "sunk")}
						          $right={(cell.ship?.neighbors.right && cell.target !== "hit" && cell.target !== null) ||
							          (cell.ship?.neighbors.right && cell.shipState === "sunk")}
						          $left={(cell.ship?.neighbors.left && cell.target !== "hit" && cell.target !== null) ||
							          (cell.ship?.neighbors.left && cell.shipState === "sunk")}
						          $bottom={(cell.ship?.neighbors.bottom && cell.target !== "hit" && cell.target !== null) ||
							          (cell.ship?.neighbors.bottom && cell.shipState === "sunk")}
						/>}
					{cell.cell !== "ship" &&
						<Empty key={cell?.id}
						       $reserved={cell.cell === "reserved"}
						       $warning={cell.cell === "warning"}
						/>}
					{cell.cellState === "set" && <CrossHairsIcon/>}
					{(cell.target === "hit" || cell.shipState === "hit") && cell.shipState !== "sunk" && <FireIcon/>}
					{cell.target === "missed" && <CircleIcon/>}
					{cell.shipState === "sunk" && <XMarkIcon/>}
				</BoardCell>))}
		</ShipsBoardWrapper>
	)
};