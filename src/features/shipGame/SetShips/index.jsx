import {useDispatch, useSelector} from "react-redux";
import {Back, Button, StyledLink} from "../../../components/Buttons";
import {Section} from "../../../components/Section";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {SetShipsWrapper, Settings, Content} from "./styled";
import {
	setShips,
	setPlayGame,
	setSettingsState,
	setShipSelectedNumber,
	setChangeShipPlace,
	selectSelectedShip,
	selectWrongSettingOfShips,
	selectLockedMoves,
	selectFirstPlayerBoard, selectFirstPlayerApprovedSetting,
} from "../shipGameSlice";
import {
	ArrowDownIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowTopIcon, CheckIcon,
	PlayIcon,
	RandomIcon,
	RotateRightIcon,
	ArrowBackIcon
} from "../../../components/Icons";

export const SetShips = () => {
	const board = useSelector(selectFirstPlayerBoard);
	const selectedShip = useSelector(selectSelectedShip);
	const wrongSettingOfShips = useSelector(selectWrongSettingOfShips);
	const lockedMoves = useSelector(selectLockedMoves);
	const approvedSetting = useSelector(selectFirstPlayerApprovedSetting)
	const dispatch = useDispatch();

	return (
		<Section>
			<SetShipsWrapper>
				<Back to="/settings" onClick={() => dispatch(setSettingsState())}><ArrowBackIcon/></Back>
				<Content>
					<ShipsBoard board={board}/>
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
				</Content>
				<StyledLink
					to="/playGame"
					$disabled={selectedShip.length > 0 || !approvedSetting}
					onClick={() => dispatch(setPlayGame())}
				>
					START <PlayIcon/>
				</StyledLink>
			</SetShipsWrapper>
		</Section>
	)
};