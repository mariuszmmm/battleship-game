import {Overlay, Wrapper} from "./styled.jsx";
import {ButtonsContainer, StyledLink} from "../Buttons/index.jsx";
import {setState} from "../../features/shipGame/shipGameSlice.jsx";
import {useDispatch} from "react-redux";

export const ConfirmationDialog = () => {
	const dispatch = useDispatch();

	return (
		<Wrapper>
			<Overlay>
				<p>Czy chcesz wyjść ?</p>
				<ButtonsContainer>
					<StyledLink to="/home" onClick={() => dispatch(setState("home"))}>TAK</StyledLink>
					<StyledLink to="/playGame">NIE</StyledLink>
				</ButtonsContainer>
			</Overlay>
		</Wrapper>
	)
}