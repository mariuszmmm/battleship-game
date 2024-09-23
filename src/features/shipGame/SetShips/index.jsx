import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonsContainer, StyledLink} from "../../../components/Buttons";
import {Section} from "../../../components/Section";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {Settings, Content} from "./styled";
import {
	setState,
	setShipSelectedNumber,
	setChangeShipPlace,
	selectSelectedShip,
	selectWrongSettingOfShips,
	selectLockedMoves,
	selectFirstPlayerBoard, selectApprovedSetting, selectState, selectSound,
} from "../shipGameSlice";
import {
	ArrowDownIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowTopIcon, CheckIcon,
	RandomIcon,
	RotateRightIcon,
	ArrowBackIcon, ArrowForwardIcon
} from "../../../components/Icons";
import {Wrapper} from "../../../components/Wrapper/index.jsx";
import {Header} from "../../../components/Header/index.jsx";
import {BoardsWrapper} from "../PlayGame/styled.jsx";
import {ConfirmationDialog} from "../../../components/ConfirmationDialog/index.jsx";
import seaWaves from "../../../assets/Audio/seaWaves.mp3";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const SetShips = () => {
	const board = useSelector(selectFirstPlayerBoard);
	const selectedShip = useSelector(selectSelectedShip);
	const wrongSettingOfShips = useSelector(selectWrongSettingOfShips);
	const lockedMoves = useSelector(selectLockedMoves);
	const approvedSetting = useSelector(selectApprovedSetting);
	const state = useSelector(selectState);
	const sound = useSelector(selectSound);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onPlayGame = () => {
		dispatch(setState("playGame"));
	}

	useEffect(() => {
		const handleBeforeUnload = (event) => {
			event.preventDefault();
		};

		window.addEventListener('beforeunload', (event) => event.preventDefault());

		if (state === "home") {
			navigate("/home");
			dispatch(setState("home"))
		}

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return (
		<>
			{state === "playGame" && <ConfirmationDialog/>}
			{state !== "playGame" &&
				<Wrapper>
					<Section>
						<Header>
							Rozmieszczenie statków
						</Header>
						<Content>
							<BoardsWrapper>
								<ShipsBoard board={board}/>
							</BoardsWrapper>
							<Settings>
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
								        onClick={() => dispatch(setShipSelectedNumber({approvedSetting: true}))}
								        disabled={selectedShip.length === 0 || wrongSettingOfShips}
								>
									<CheckIcon/>
								</Button>
								<Button $area="random" onClick={() => dispatch(setState("setShips"))}>
									<RandomIcon/> Random ships
								</Button>
								<ButtonsContainer $area="navigation">
									<StyledLink to="/settings" onClick={() => dispatch(setState("settings"))}>
										<ArrowBackIcon/>Wstecz
									</StyledLink>
									<StyledLink
										to="/playGame"
										$disabled={selectedShip.length > 0 || !approvedSetting}
										onClick={onPlayGame}
									>
										Start<ArrowForwardIcon/>
									</StyledLink>
								</ButtonsContainer>
							</Settings>
						</Content>
					</Section>
				</Wrapper>
			}
		</>
	)
};