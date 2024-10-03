import {SettingsItem} from "./styled.jsx";
import {GameMode} from "./GameMode/index.jsx";
import {Ships} from "./Ships/index.jsx";
import {Shots} from "./Shots/index.jsx";
import {Additional} from "./Additional/index.jsx";
import {ArrowBackIcon, ArrowForwardIcon} from "../../../components/Icons/index.jsx";
import {ButtonsContainer, StyledLink} from "../../../components/Buttons/index.jsx";
import {Section} from "../../../components/Section/index.jsx";
import {
	selectGameMode, selectActivePlayer, setState, setActivePlayer, setShips, setNumberOfShots
} from "../shipGameSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Difficulty} from "./Difficulty"
import {Header} from "../../../components/Header/index.jsx";
import {Wrapper} from "../../../components/Wrapper/index.jsx";
import {ConfirmationDialog} from "../../../components/ConfirmationDialog/index.jsx";

export const Settings = () => {
	const dispatch = useDispatch();
	const gameMode = useSelector(selectGameMode);
	const activePlayer = useSelector(selectActivePlayer);

	const onClickHandler = () => {
		sessionStorage.setItem("playGame", "true");
		dispatch(setShips());

		if (gameMode === "compVsComp") {
			dispatch(setState("playGame"));
			dispatch(setActivePlayer("firstPlayer"));
			dispatch(setNumberOfShots());
		}
	};

	return (<>
			{activePlayer && <ConfirmationDialog/>}
			{!activePlayer && <Wrapper>
				<Section>
					<Header>
						Ustawienia gry
					</Header>
					<SettingsItem>
						<GameMode/>
						<Difficulty/>
						<Ships/>
						<Shots/>
						<Additional/>
					</SettingsItem>
					<ButtonsContainer>
						<StyledLink to="/home" onClick={() => dispatch(setState("home"))}><ArrowBackIcon/>Wstecz</StyledLink>
						<StyledLink
							to={gameMode === "compVsComp" ? "/playGame" : "/setShips"}
							onClick={onClickHandler}
							$animation
						>
							Dalej<ArrowForwardIcon/></StyledLink>
					</ButtonsContainer>
				</Section>
			</Wrapper>}
		</>);
};