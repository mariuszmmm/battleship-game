import {Fieldset, Legend} from "../styled.jsx";
import {selectPlayers, setParameters} from "../../shipGameSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonsContainer} from "../../../../components/Buttons/index.jsx";
import {UserIcon, DesktopIcon} from "../../../../components/Icons/index.jsx";


export const GameMode = () => {
	const players = useSelector(selectPlayers);
	const dispatch = useDispatch();

	const onChangeHandler = (gameMode) => {
		dispatch(setParameters({players: gameMode}))
	};

	return (
		<Fieldset>
			<Legend>Tryb gry</Legend>
			<ButtonsContainer>
				<Button $active={players === "compVsPlayer"}
				        onClick={() => onChangeHandler("compVsPlayer")}
				        $setting
				>
					<DesktopIcon $active={players === "compVsPlayer"}/>
					<UserIcon $active={players === "compVsPlayer"}/>
				</Button>
				<Button $active={players === "compVsComp"}
				        onClick={() => onChangeHandler("compVsComp")}
				        $setting
				>
					<DesktopIcon $active={players === "compVsComp"}/>
					<DesktopIcon $active={players === "compVsComp"}/>
				</Button>
				<Button $active={players === "playerVsPlayer"}
				        onClick={() => onChangeHandler("playerVsPlayer")}
				        $setting
				        disabled
				>
					<UserIcon $active={players === "playerVsPlayer"} $disabled/>
					<UserIcon $active={players === "playerVsPlayer"} $disabled/>
				</Button>
			</ButtonsContainer>
		</Fieldset>
	);
};