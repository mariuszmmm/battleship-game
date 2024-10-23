import {ShipsBoardWrapper, BoardCell, ColName, RowName, ShipItem, Empty} from "./styled"
import {
	selectActivePlayer,
	selectFirstPlayerShotInCell,
	selectFirstPlayerTarget,
	selectGameMode,
	setShipSelectedNumber,
	setTarget,
	selectFirstPlayerNumberOfShots,
	selectSecondPlayerNumberOfShots
} from "../../features/shipGame/shipGameSlice"
import {CrossHairsIcon, XMarkIcon, FireIcon, CircleIcon} from "../Icons";
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../config/hooks";
import {Board, Cell, Parameters, Player, StateOfPlayers} from "../../types/types";

interface ShipsBoardProps {
	board: Board;
	player?: Player;
	toLeft?: boolean;
}

export const ShipsBoard = ({board, player, toLeft}: ShipsBoardProps) => {
	const dispatch = useAppDispatch();
	const target: StateOfPlayers["target"] = useAppSelector(selectFirstPlayerTarget);
	const shotInCell: StateOfPlayers["shotInCell"] = useAppSelector(selectFirstPlayerShotInCell)
	const gameMode: Parameters["gameMode"] = useAppSelector(selectGameMode);
	const activePlayer: Player = useAppSelector(selectActivePlayer);
	const firstPlayerNumberOfShots: StateOfPlayers["numberOfShots"] = useAppSelector(selectFirstPlayerNumberOfShots);
	const secondPlayerNumberOfShots: StateOfPlayers["numberOfShots"] = useAppSelector(selectSecondPlayerNumberOfShots);
	const {pathname} = useLocation();

	const onClickHandler = (cell: Cell) => {
		const numberOfShots: StateOfPlayers["numberOfShots"] = (activePlayer === "firstPlayer" ? firstPlayerNumberOfShots : secondPlayerNumberOfShots);
		if ((target && shotInCell) || gameMode === "compVsComp" || (!numberOfShots && activePlayer && pathname === "/playGame")) return;
		if (player) dispatch(setTarget({target: cell.id, player}));
		if (cell.cell === "ship" && cell.ship) {
			dispatch(setShipSelectedNumber({number: cell.ship.numberOfShip, approvedSetting: false}))
		}
	};

	return (
		<ShipsBoardWrapper $toLeft={!!toLeft}>
			{board.map((col, colIndex) => col.map((cell, cellIndex) =>
				<BoardCell key={cell.id}
				           onClick={() => onClickHandler(cell)}
				           $compVsComp={gameMode === "compVsComp"}
				           $hovered={pathname === "/playGame" && activePlayer === player && firstPlayerNumberOfShots > 0}
				           $targeted={pathname === "/playGame" && cell.cellState === "set"}
				           $targetedLine={pathname === "/playGame" && target !== null &&
					           (cell.col.name === target.charAt(0) ||
						           cell.row.name === (target.charAt(1) + target.charAt(2)))}
				>
					{cellIndex === 0 && <ColName>{cell.col.name}</ColName>}
					{colIndex === 0 && <RowName>{cell.row.name}</RowName>}
					{cell.cell === "ship" &&
						<ShipItem key={cell.id}
						          $sunk={cell.shipState === "sunk"}
						          $compVsComp={gameMode === "compVsComp"}
						          $selected={pathname === "/setShips" && !!cell.ship?.selected}
						          $top={!!(cell.ship?.neighbors?.top && cell.target !== "hit") ||
							          !!(cell.ship?.neighbors?.top && cell.shipState === "sunk")}
						          $right={!!(cell.ship?.neighbors?.right && cell.target !== "hit") ||
							          !!(cell.ship?.neighbors?.right && cell.shipState === "sunk")}
						          $left={!!(cell.ship?.neighbors?.left && cell.target !== "hit") ||
							          !!(cell.ship?.neighbors?.left && cell.shipState === "sunk")}
						          $bottom={!!(cell.ship?.neighbors?.bottom && cell.target !== "hit") ||
							          !!(cell.ship?.neighbors?.bottom && cell.shipState === "sunk")}
						/>}
					{cell.cell !== "ship" &&
						<Empty key={cell.id}
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