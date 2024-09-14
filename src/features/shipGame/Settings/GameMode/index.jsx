import {ButtonsContainer, Fieldset, Legend} from "../styled.jsx";
import {selectPlayers, setParameters} from "../../shipGameSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../../../../components/Buttons/index.jsx";
import {UserIcon, DesktopIcon} from "../../../../components/Icons/index.jsx";


export const GameMode = () => {
	const players = useSelector(selectPlayers);
	const dispatch = useDispatch();

	const onChangeHandler = (gameMode) => {
		switch (gameMode) {
			case "compVsComp":
				dispatch(setParameters({players: "compVsComp"}))
				break;
			case "compVsPlayer":
				dispatch(setParameters({players: "compVsPlayer"}))
				break;
			case "playerVsPlayer":
				dispatch(setParameters({players: "playerVsPlayer"}))
				break;
			default:
				return
		}
	};

	return (
		<Fieldset>
			<Legend>Tryb gry</Legend>
			<ButtonsContainer>
				<Button $active={players === "compVsPlayer"}
				        onClick={() => onChangeHandler("compVsPlayer")}
				>
					<DesktopIcon $active={players === "compVsPlayer"}/>
					<UserIcon $active={players === "compVsPlayer"}/>
				</Button>
				<Button $active={players === "compVsComp"}
				        onClick={() => onChangeHandler("compVsComp")}
				>
					<DesktopIcon $active={players === "compVsComp"}/>
					<DesktopIcon $active={players === "compVsComp"}/>
				</Button>
				<Button $active={players === "playerVsPlayer"}
				        onClick={() => onChangeHandler("playerVsPlayer")}
				        disabled
				>
					<UserIcon $active={players === "playerVsPlayer"}/>
					<UserIcon $active={players === "playerVsPlayer"}/>
				</Button>
			</ButtonsContainer>
		</Fieldset>
	)
};