import {useState} from 'react'
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
import {Button} from "../../../components/Buttons";
import {FleetInfo} from "../../../components/FleetInfo"
import {useEffect} from "react";
import {Header} from "../../../components/Header/index.jsx";
import {Wrapper} from "../../../components/Wrapper/index.jsx";
import {ConfirmationDialog} from "../../../components/ConfirmationDialog/index.jsx";

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
		dispatch(setActivePlayer("firstPlayer"));

		const handleBeforeUnload = (event) => {
			event.preventDefault();
		};
		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return (
		<Wrapper>
			<Section>
				<Header>
					{activePlayer === "firstPlayer" ?
						players === "compVsComp" ? "Ruch komputera pierwszego" : "Twój ruch"
						:
						players === "compVsComp" ? "Komputer drugi atakuje" : "Przeciwnik atakuje"
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

						</Info>
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
					</InfoWrapper>
				</Content>
			</Section>
		</Wrapper>
	)
};