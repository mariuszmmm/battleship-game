import {Section} from "../../../components/Section";
import {Content, Info, BoardsWrapper, InfoWrapper} from "./styled";
import {ShipsBoard} from "../../../components/ShipsBoard";
import {useDispatch, useSelector} from "react-redux";
import {
	selectActivePlayer,
	selectFirstPlayerBoard,
	selectFirstPlayerBoardToShots,
	selectFirstPlayerNumberOfShots, selectFirstPlayerTarget,
	setShot, setActivePlayer, selectState,
	selectSecondPlayerFleet, selectFirstPlayerShotInCell, selectPlayers, selectWinner, selectSound, setState
} from "../shipGameSlice.jsx"
import {Button} from "../../../components/Buttons";
import {FleetInfo} from "../../../components/FleetInfo"
import {useEffect, useRef, useState} from "react";
import {Header} from "../../../components/Header/index.jsx";
import {Wrapper} from "../../../components/Wrapper/index.jsx";
import {GameResult} from "../../../components/GameResult/index.jsx";
import shotSound from "../../../assets/Audio/shot.mp3"
import seaWaves from "../../../assets/Audio/seaWaves.mp3"
import {ConfirmationDialog} from "../../../components/ConfirmationDialog/index.jsx";
import {Home} from "../Home/index.jsx";
import {useNavigate, useLocation} from "react-router-dom";

export const PlayGame = () => {
	const firstPlayerBoard = useSelector(selectFirstPlayerBoard);
	const firstPlayerBoardToShots = useSelector(selectFirstPlayerBoardToShots);
	const firstPlayerTargetInCell = useSelector(selectFirstPlayerTarget);
	const firstPlayerNumberOfShots = useSelector(selectFirstPlayerNumberOfShots);
	const secondPlayerFleet = useSelector(selectSecondPlayerFleet);
	const activePlayer = useSelector(selectActivePlayer);
	const target = useSelector(selectFirstPlayerTarget);
	const shotInCell = useSelector(selectFirstPlayerShotInCell);
	const players = useSelector(selectPlayers);
	const winner = useSelector(selectWinner);
	const dispatch = useDispatch();
	const sound = useSelector(selectSound);
	const state = useSelector(selectState);
	const navigate = useNavigate();
	const {pathname} = useLocation();
	const playersName = ["firstPlayer", "secondPlayer"];
	const audioRef = useRef(null);

	useEffect(() => {
		dispatch(setActivePlayer("firstPlayer"));

		const handleBeforeUnload = (event) => {
			event.preventDefault();
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		if(state !== "playGame") {
			dispatch(setState("home"));
			navigate("/home");
		}

		audioRef.current = new Audio(seaWaves);
		if (sound) {
			audioRef.current.play();
			audioRef.current.loop = true;
			audioRef.current.volume= 0.3;
		}

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
			sound && audioRef.current.pause();
		};
	}, []);

	const onShot = () => {
		dispatch(setShot({
			shotInCell: firstPlayerTargetInCell, player: activePlayer
		}));
		if (sound) {
			const audio = new Audio(shotSound)
			audio.play();
		}
	}

	useEffect(() => {
		if(pathname !== "/playGame") {
			console.log("/playGame")
			dispatch(setState("home"));
			navigate("/home");
		}
	}, [pathname]);


	return (
		<>
			{winner && <GameResult/>}
			<Wrapper>
				<Section>
					<Header>
						{activePlayer === "firstPlayer" ?
							players === "compVsComp" ? "Ruch pierwszego komputera" : "Twój ruch"
							:
							players === "compVsComp" ? "Ruch drugiego komputera" : "Ruch drugiego gracza"
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
								onClick={onShot}
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
		</>
	)
};