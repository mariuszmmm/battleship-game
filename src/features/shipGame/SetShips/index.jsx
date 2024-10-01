import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonsContainer, StyledLink} from "../../../components/Buttons";
import {Section} from "../../../components/Section";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {Settings, Content} from "./styled";
import {
	setState, setShipSelectedNumber,
	setChangeShipPlace, setActivePlayer,
	selectSelectedShip, selectWrongSettingOfShips,
	selectLockedMoves, selectFirstPlayerBoard,
	selectApprovedSetting, selectState, setNumberOfShots
} from "../shipGameSlice";
import {
	ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon,
	ArrowTopIcon, CheckIcon, RandomIcon,
	RotateRightIcon, ArrowBackIcon, ArrowForwardIcon
} from "../../../components/Icons";
import {Wrapper} from "../../../components/Wrapper/index.jsx";
import {Header} from "../../../components/Header/index.jsx";
import {BoardsWrapper} from "../PlayGame/styled.jsx";
import {ConfirmationDialog} from "../../../components/ConfirmationDialog/index.jsx";
import {useEffect} from "react";
import {useHandleBeforeUnload} from "../../../utils/useHandleBeforeUnload.jsx";
import {useNavigate} from "react-router-dom";
import {useHandleRotateScreen} from "../../../utils/useHandleRotateScreen.jsx";
import {RotateScreenInfo} from "../../../components/RotateScreenInfo/index.jsx";

export const SetShips = () => {
	const board = useSelector(selectFirstPlayerBoard);
	const selectedShip = useSelector(selectSelectedShip);
	const wrongSettingOfShips = useSelector(selectWrongSettingOfShips);
	const lockedMoves = useSelector(selectLockedMoves);
	const approvedSetting = useSelector(selectApprovedSetting);
	const state = useSelector(selectState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onRandomHandler = () => {
		dispatch(setShipSelectedNumber({approvedSetting: true}));
	};

	const onSettingsHandler = () => {
		dispatch(setShipSelectedNumber({approvedSetting: false}));
	};

	const onPlayGameHandler = () => {
		if (selectedShip.length > 0 || !approvedSetting) return;
		dispatch(setState("playGame"));
		dispatch(setActivePlayer("firstPlayer"));
		dispatch(setNumberOfShots());
	};

	useEffect(() => {
		const storage = sessionStorage.getItem("playGame");
		if (!storage) navigate("/", {replace: true});
	}, []);

	useHandleBeforeUnload();
	const turn = useHandleRotateScreen();

	return (
		<>
			{state === "playGame" && <ConfirmationDialog/>}
			{state !== "playGame" &&
				<Wrapper>
					{turn ? <RotateScreenInfo/> :
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
									        disabled={selectedShip.length === 0 ||
										        lockedMoves[selectedShip[0].numberOfShip]?.toTop}
									>
										<ArrowTopIcon/>
									</Button>
									<Button $area="arrow-left"
									        onClick={() => dispatch(setChangeShipPlace("toLeft"))}
									        disabled={selectedShip.length === 0 ||
										        lockedMoves[selectedShip[0].numberOfShip]?.toLeft}
									>
										<ArrowLeftIcon/>
									</Button>
									<Button $area="rotate"
									        onClick={() => dispatch(setChangeShipPlace("rotate"))}
									        disabled={selectedShip.length === 0 ||
										        lockedMoves[selectedShip[0].numberOfShip]?.toRotate}
									>
										<RotateRightIcon/>
									</Button>
									<Button $area="arrow-right"
									        onClick={() => dispatch(setChangeShipPlace("toRight"))}
									        disabled={selectedShip.length === 0 ||
										        lockedMoves[selectedShip[0].numberOfShip]?.toRight}
									>
										<ArrowRightIcon/>
									</Button>
									<Button $area="arrow-down"
									        onClick={() => dispatch(setChangeShipPlace("toDown"))}
									        disabled={selectedShip.length === 0 ||
										        lockedMoves[selectedShip[0].numberOfShip]?.toDown}
									>
										<ArrowDownIcon/>
									</Button>
									<Button $area="check-on"
									        onClick={() => dispatch(setShipSelectedNumber({approvedSetting: true}))}
									        disabled={selectedShip.length === 0 || wrongSettingOfShips}
									        $animation={selectedShip.length > 0 && !wrongSettingOfShips}
									>
										<CheckIcon/>
									</Button>
									<Button $area="random" onClick={onRandomHandler}>
										<RandomIcon/> Random ships
									</Button>
									<ButtonsContainer $area="navigation">
										<StyledLink to="/settings" onClick={onSettingsHandler}>
											<ArrowBackIcon/>Wstecz
										</StyledLink>
										<StyledLink
											to="/playGame"
											$disabled={selectedShip.length > 0 || !approvedSetting}
											onClick={onPlayGameHandler}
											$animation={selectedShip.length === 0 && approvedSetting}
										>
											Start<ArrowForwardIcon/>
										</StyledLink>
									</ButtonsContainer>
								</Settings>
							</Content>
						</Section>
					}
				</Wrapper>
			}
		</>
	);
};