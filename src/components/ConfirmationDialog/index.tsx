import React from "react";
import {Overlay, Wrapper} from "./styled";
import {ButtonsContainer, StyledLink} from "../Buttons";
import {setClearBoard} from "../../features/shipGame/shipGameSlice";
import {useAppDispatch} from "../../config/hooks";

interface ConfirmationDialogProps {
	question: string
}

export const ConfirmationDialog = ({question}: ConfirmationDialogProps) => {
	const dispatch = useAppDispatch();

	return (
		<Wrapper>
			<Overlay>
				<p>{question}</p>
				<ButtonsContainer>
					<StyledLink to="/home" onClick={() => dispatch(setClearBoard())} replace={true}>TAK</StyledLink>
					<StyledLink to="/playGame">NIE</StyledLink>
				</ButtonsContainer>
			</Overlay>
		</Wrapper>
	);
};