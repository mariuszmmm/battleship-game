import {Overlay, Wrapper} from "./styled.jsx";
import {ButtonsContainer, StyledLink} from "../Buttons/index.jsx";
import {setClearBoard} from "../../features/shipGame/shipGameSlice.jsx";
import {useDispatch} from "react-redux";

export const ConfirmationDialog = () => {
	const dispatch = useDispatch();

	return (
		<Wrapper>
			<Overlay>
				<p>Chcesz wyjść ?</p>
				<ButtonsContainer>
					<StyledLink to="/home" onClick={() => dispatch(setClearBoard())} replace={true}>TAK</StyledLink>
					<StyledLink to="/playGame">NIE</StyledLink>
				</ButtonsContainer>
			</Overlay>
		</Wrapper>
	);
};