import {Button, ButtonsContainer, StyledLink} from "../../../components/Buttons";
import {Section} from "../../../components/Section";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {Settings, Content} from "./styled";
import {
	setState, setShipSelectedNumber,
	setChangeShipPlace, setActivePlayer,
	selectSelectedShip, selectWrongSettingOfShips,
	selectLockedMoves, selectFirstPlayerBoard,
	selectApprovedSetting, selectState, setNumberOfShots, setShips
} from "../shipGameSlice";
import {
	ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon,
	ArrowTopIcon, CheckIcon, RandomIcon,
	RotateRightIcon, ArrowBackIcon, ArrowForwardIcon
} from "../../../components/Icons";
import {Wrapper} from "../../../components/Wrapper";
import {Header} from "../../../components/Header";
import {BoardsWrapper} from "../PlayGame/styled";
import {ConfirmationDialog} from "../../../components/ConfirmationDialog";
import {useEffect} from "react";
import {useHandleBeforeUnload} from "../../../utils/useHandleBeforeUnload";
import {useNavigate} from "react-router-dom";
import {useHandleRotateScreen} from "../../../utils/useHandleRotateScreen";
import {RotateScreenInfo} from "../../../components/RotateScreenInfo";
import {useAppDispatch, useAppSelector} from "../../../config/hooks";
import {LockedMoves} from "../../../types/types";

export const SetShips = () => {
	const board = useAppSelector(selectFirstPlayerBoard);
	const selectedShip = useAppSelector(selectSelectedShip);
	const wrongSettingOfShips = useAppSelector(selectWrongSettingOfShips);
	const lockedMoves = useAppSelector(selectLockedMoves) as LockedMoves;
	const approvedSetting = useAppSelector(selectApprovedSetting);
	const state = useAppSelector(selectState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onRandomHandler = () => {
		dispatch(setShipSelectedNumber({number: null, approvedSetting: true}));
		dispatch(setShips());
	};

	const onSettingsHandler = () => {
		dispatch(setShipSelectedNumber({number: null, approvedSetting: false}));
	};

	const onPlayGameHandler = () => {
		if (selectedShip.length > 0 || !approvedSetting) return;
		dispatch(setState("playGame"));
		dispatch(setActivePlayer("firstPlayer"));
		dispatch(setNumberOfShots());
	};

	useEffect(() => {
		const storage = sessionStorage.getItem("game");
		if (!storage) navigate("/", {replace: true});
	}, []);

	useHandleBeforeUnload();
	const turn = useHandleRotateScreen();

	return (
		<>
			{state === "playGame" && <ConfirmationDialog question={"Chcesz zakończyć ?"}/>}
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
										        lockedMoves[selectedShip[0].numberOfShip].toTop}
									>
										<ArrowTopIcon/>
									</Button>
									<Button $area="arrow-left"
									        onClick={() => dispatch(setChangeShipPlace("toLeft"))}
									        disabled={selectedShip.length === 0 ||
										        lockedMoves[selectedShip[0].numberOfShip].toLeft}
									>
										<ArrowLeftIcon/>
									</Button>
									<Button $area="rotate"
									        onClick={() => dispatch(setChangeShipPlace("rotate"))}
									        disabled={selectedShip.length === 0 ||
										        lockedMoves[selectedShip[0].numberOfShip].rotate}
									>
										<RotateRightIcon/>
									</Button>
									<Button $area="arrow-right"
									        onClick={() => dispatch(setChangeShipPlace("toRight"))}
									        disabled={selectedShip.length === 0 ||
										        lockedMoves[selectedShip[0].numberOfShip].toRight}
									>
										<ArrowRightIcon/>
									</Button>
									<Button $area="arrow-down"
									        onClick={() => dispatch(setChangeShipPlace("toDown"))}
									        disabled={selectedShip.length === 0 ||
										        lockedMoves[selectedShip[0].numberOfShip].toDown}
									>
										<ArrowDownIcon/>
									</Button>
									<Button $area="check-on"
									        onClick={() => dispatch(setShipSelectedNumber({number: null, approvedSetting: true}))}
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