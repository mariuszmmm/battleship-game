import {Overlay, Wrapper, ButtonContainer} from "./styled.jsx";
import {StyledLink} from "../Buttons/index.jsx";
import {setState} from "../../features/shipGame/shipGameSlice.jsx";
import {useDispatch} from "react-redux";

export const ConfirmationDialog = ({text, setOverGame}) => {
	const dispatch = useDispatch();

	const onNoHandler = () => {
		setOverGame(false)
		dispatch(setState("playGame"))
	};

	return (
		<Wrapper>
			<Overlay>
				<p>{text}</p>
				<ButtonContainer>
					<StyledLink to="/home" onClick={() => dispatch(setState("home"))}>TAK</StyledLink>
					<StyledLink to="/playGame" onClick={onNoHandler}>NIE</StyledLink>
				</ButtonContainer>
			</Overlay>
		</Wrapper>
	)
}