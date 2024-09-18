import {Section} from "../../../components/Section";
import {Content, Info, BoardsWrapper, InfoWrapper} from "./styled";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {useDispatch, useSelector} from "react-redux";
import {
	selectActivePlayer,
	selectFirstPlayerBoard,
	selectFirstPlayerBoardToShots,
	selectFirstPlayerNumberOfShots, selectFirstPlayerTarget,
	setShot, setActivePlayer,
	selectSecondPlayerFleet, selectFirstPlayerShotInCell, selectPlayers
} from "../shipGameSlice.jsx"
import {Back, Button} from "../../../components/Buttons";
import {HomeIcon} from "../../../components/Icons";
import {FleetInfo} from "../../../components/FleetInfo"
import {useEffect, useState} from "react";
import {ConfirmationDialog} from "../../../components/ConfirmationDialog";
import {ButtonContainer} from "../../../components/ConfirmationDialog/styled.jsx";
import {Header} from "../../../components/Header/index.jsx";
import {Wrapper} from "../../../components/Wrapper/index.jsx";

export const PlayGame = () => {
	const firstPlayerBoard = useSelector(selectFirstPlayerBoard);
	const firstPlayerBoardToShots = useSelector(selectFirstPlayerBoardToShots);
	const firstPlayerTargetInCell = useSelector(selectFirstPlayerTarget);
	const firstPlayerNumberOfShots = useSelector(selectFirstPlayerNumberOfShots);
	const secondPlayerFleet = useSelector(selectSecondPlayerFleet);
	const activePlayer = useSelector(selectActivePlayer);
	const target = useSelector(selectFirstPlayerTarget);
	const shotInCell = useSelector(selectFirstPlayerShotInCell)
	const players = useSelector(selectPlayers)
	const dispatch = useDispatch();
	const playersName = ["firstPlayer", "secondPlayer"];

	useEffect(() => {
		dispatch(setActivePlayer("firstPlayer"))
	}, [])

	const [overGame, setOverGame] = useState(false)

	return (
		<>
			{overGame && <ConfirmationDialog setOverGame={setOverGame} text={"Czy chcesz zakończyć grę ?"}/>}
			<Section>
				<Wrapper>
					<Back to={null} onClick={() => setOverGame(true)}><HomeIcon/></Back>
					<Header>
						{activePlayer === "firstPlayer" ?
							"Twój ruch"
							:
							"Przeciwnik atakuje"
						}
					</Header>
					<Content>
						<BoardsWrapper>
							<ShipsBoard board={firstPlayerBoardToShots}
							            player={playersName[0]}
							            toLeft={activePlayer === "secondPlayer"}
							/>
							<ShipsBoard board={firstPlayerBoard}
							            toLeft={activePlayer === "secondPlayer"}
							/>
						</BoardsWrapper>
						<InfoWrapper>
							<Info>
								<p>Strzały: {firstPlayerNumberOfShots}</p>
								<p>Statki przeciwnika</p>
								<FleetInfo fleet={{...secondPlayerFleet}}/>
								<p>Cel: {firstPlayerTargetInCell}</p>
								<ButtonContainer>
									<Button
										onClick={() => dispatch(setShot({
											shotInCell: firstPlayerTargetInCell,
										}))}
										disabled={
											activePlayer !== playersName[0] ||
											!target ||
											(target && shotInCell) ||
											players === "compVsComp"
										}
										$shot
									>
										STRZAŁ
									</Button>
								</ButtonContainer>
							</Info>
						</InfoWrapper>
					</Content>
				</Wrapper>
			</Section>
		</>
	)
};