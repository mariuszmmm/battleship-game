import {SettingsItem} from "./styled.jsx";
import {GameMode} from "./GameMode/index.jsx";
import {Ships} from "./Ships/index.jsx";
import {Shots} from "./Shots/index.jsx";
import {Additional} from "./Additional/index.jsx";
import {ArrowBackIcon, ArrowForwardIcon} from "../../../components/Icons/index.jsx";
import {ButtonsContainer, StyledLink} from "../../../components/Buttons/index.jsx";
import {Section} from "../../../components/Section/index.jsx";
import {
	selectPlayers, selectState,
	setState, getParameters, setShipSelectedNumber, setActivePlayer
} from "../shipGameSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Difficulty} from "./Difficulty"
import {Header} from "../../../components/Header/index.jsx";
import {Wrapper} from "../../../components/Wrapper/index.jsx";
import {ConfirmationDialog} from "../../../components/ConfirmationDialog/index.jsx";

export const Settings = () => {
	const dispatch = useDispatch();
	const state = useSelector(selectState);
	const players = useSelector(selectPlayers);

	const onClickHandler = () => {
		dispatch(getParameters());
		dispatch(setShipSelectedNumber({number: null}));
		dispatch(setActivePlayer("firstPlayer"));
		dispatch(setState("setShips"));
	};

	return (
		<>
			{state === "playGame" && <ConfirmationDialog/>}
			{state !== "playGame" &&
				<Wrapper>
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
								to={players === "compVsComp" ? "/playGame" : "/setShips"}
								onClick={onClickHandler}
								$animation
							>
								Dalej<ArrowForwardIcon/></StyledLink>
						</ButtonsContainer>
					</Section>
				</Wrapper>
			};
		</>
	);
};