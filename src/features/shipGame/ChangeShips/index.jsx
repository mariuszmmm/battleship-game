import {
	BoardCell,
	PlayWrapper,
	ShipsBoard,
	ColName, RowName,
	ShipItem, Reserved, Settings, SetShips
} from "./styled.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	selectBoard,
	setSettingsState,
	shipSelect,
	setRotateShip, setChangeShipsState,
	moveToTop, moveToDown, 	moveToLeft, moveToRight,
	selectSelectedShip
} from "../shipGameSlice.jsx";
import {Back, Button, StyledLink} from "../../../components/Buttons/index.jsx";
import {
	ArrowDownIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowTopIcon, CheckIcon,
	PlayIcon,
	RandomIcon,
	RotateRightIcon,
	ArrowBackIcon
} from "../../../components/Icons/index.jsx";
import {Section} from "../../../components/Section/index.jsx";
// import {rotateSelectedShip} from "./rotateSelectedShip.jsx";

export const ChangeShips = () => {
	const board = useSelector(selectBoard);
	const selectedShip = useSelector(selectSelectedShip);
	const dispatch = useDispatch();

	useEffect(() => {
		// if (state === "changeShips") dispatch(setStateNewGame());

		// eslint-disable-next-line
	}, []);

	return (
		<Section>
			<PlayWrapper>
				<Back to="/settings" onClick={() => dispatch(setSettingsState())}><ArrowBackIcon/></Back>
				<SetShips>
					<ShipsBoard>
						{board.map((col, colIndex) =>
							col.map((cell, cellIndex) =>
								<BoardCell key={cell.id} $ship={cell.cell === "ship"}>
									{cellIndex === 0 && <ColName>{cell.col.name}</ColName>}
									{colIndex === 0 && <RowName>{cell.row.name}</RowName>}
									{cell.cell === "ship" &&
										<ShipItem key={cell?.id}
										          $top={cell.ship.neighbors.top}
										          $right={cell.ship.neighbors.right}
										          $left={cell.ship.neighbors.left}
										          $bottom={cell.ship.neighbors.bottom}
										          onClick={() => dispatch(shipSelect({board, cell, selectedShip}))}
										          $selected={cell.selected}
										/>}
									{/*{console.log(cell)}*/}
									{cell.cell === "reserved" && <Reserved key={cell?.id}/>}
								</BoardCell>))}
					</ShipsBoard>
					<Settings>
						<Button $area="random" onClick={() => dispatch(setChangeShipsState())}>
							<RandomIcon/> Random ships
						</Button>
						<Button $area="arrow-top" onClick={() => dispatch(moveToTop(selectedShip))}>
							<ArrowTopIcon/>
						</Button>
						<Button $area="arrow-left" onClick={() => dispatch(moveToLeft(selectedShip))}>
							<ArrowLeftIcon/>
						</Button>
						<Button $area="rotate" onClick={() => dispatch(setRotateShip())}>
							<RotateRightIcon/>
						</Button>
						<Button $area="arrow-right" onClick={() => dispatch(moveToRight(selectedShip))}>
							<ArrowRightIcon/>
						</Button>
						<Button $area="arrow-down" onClick={() => dispatch(moveToDown(selectedShip))}>
							<ArrowDownIcon/>
						</Button>
						<Button $area="check-on">
							<CheckIcon/>
						</Button>
					</Settings>
				</SetShips>
				<StyledLink to="">START<PlayIcon/></StyledLink>
			</PlayWrapper>
		</Section>
	)
};