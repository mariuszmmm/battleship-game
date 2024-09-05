import {
	BoardCell,
	PlayWrapper,
	ShipsBoard,
	ColName, RowName,
	ShipItem, Settings, SetShips, Empty
} from "./styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
	selectBoard,
	setSettingsState,
	setShipSelectedNumber,
	setChangeShipPlace,
	selectSelectedShip,
	setShips, selectWrongSettingOfShips, selectLockedMoves, selectApprovedSetting
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

export const ChangeShips = () => {
	const board = useSelector(selectBoard);
	const selectedShip = useSelector(selectSelectedShip);
	const wrongSettingOfShips = useSelector(selectWrongSettingOfShips);
	const lockedMoves = useSelector(selectLockedMoves);
	const approvedSetting = useSelector(selectApprovedSetting)
	const dispatch = useDispatch();

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
										          $top={cell.ship?.neighbors.top}
										          $right={cell.ship?.neighbors.right}
										          $left={cell.ship?.neighbors.left}
										          $bottom={cell.ship?.neighbors.bottom}
										          onClick={() => dispatch(setShipSelectedNumber({number: cell.ship.numberOfShip}))}
										          $selected={cell.ship?.selected}
										/>}
									{cell.cell !== "ship" &&
										<Empty key={cell?.id}
										       $reserved={cell.cell === "reserved"}
										       $warning={cell.cell === "warning"}
										/>}
								</BoardCell>))}
					</ShipsBoard>
					<Settings>
						<Button $area="random" onClick={() => dispatch(setShips())}>
							<RandomIcon/> Random ships
						</Button>
						<Button $area="arrow-top"
						        onClick={() => dispatch(setChangeShipPlace("toTop"))}
						        disabled={selectedShip.length === 0 || lockedMoves[selectedShip[0].numberOfShip]?.toTop}
						>
							<ArrowTopIcon/>
						</Button>
						<Button $area="arrow-left"
						        onClick={() => dispatch(setChangeShipPlace("toLeft"))}
						        disabled={selectedShip.length === 0 || lockedMoves[selectedShip[0].numberOfShip]?.toLeft}
						>
							<ArrowLeftIcon/>
						</Button>
						<Button $area="rotate"
						        onClick={() => dispatch(setChangeShipPlace("rotate"))}
						        disabled={selectedShip.length === 0 || lockedMoves[selectedShip[0].numberOfShip]?.toRotate}
						>
							<RotateRightIcon/>
						</Button>
						<Button $area="arrow-right"
						        onClick={() => dispatch(setChangeShipPlace("toRight"))}
						        disabled={selectedShip.length === 0 || lockedMoves[selectedShip[0].numberOfShip]?.toRight}
						>

							<ArrowRightIcon/>
						</Button>
						<Button $area="arrow-down"
						        onClick={() => dispatch(setChangeShipPlace("toDown"))}
						        disabled={selectedShip.length === 0 || lockedMoves[selectedShip[0].numberOfShip]?.toDown}
						>
							<ArrowDownIcon/>
						</Button>
						<Button $area="check-on"
						        onClick={() => dispatch(setShipSelectedNumber({
							        number: selectedShip[0].numberOfShip,
							        approvedSetting: true
						        }))}
						        disabled={selectedShip.length === 0 || wrongSettingOfShips}
						>
							<CheckIcon/>
						</Button>
					</Settings>
				</SetShips>
				<StyledLink to="" $disabled={selectedShip.length > 0 || !approvedSetting}>START<PlayIcon/></StyledLink>
			</PlayWrapper>
		</Section>
	)
};