import {Overlay, Wrapper, ButtonContainer} from "./styled.jsx";
import {StyledLink} from "../Buttons/index.jsx";
import {setState} from "../../features/shipGame/shipGameSlice.jsx";
import {useDispatch} from "react-redux";

// eslint-disable-next-line
export const ConfirmationDialog = ({setOverGame, text} ) => {
	const dispatch = useDispatch();

	return (
		<Wrapper>
			<Overlay>
				<p>{text}</p>
				<ButtonContainer>
					<StyledLink to="/home" onClick={() => dispatch(setState("home"))}>TAK</StyledLink>
					<StyledLink to="/playGame" onClick={() => setOverGame(false)}>NIE</StyledLink>
				</ButtonContainer>
			</Overlay>
		</Wrapper>
	)
}