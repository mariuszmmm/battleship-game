import styled from "styled-components";
import background from "../../../assets/Images/background.jpg";

export const HomeWrapper = styled.div`
	background-color: ${({theme}) => theme.colors.backgroundColor};
	background-image: url(${background});
	background-size: cover;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	
	@media (orientation: landscape) {
		width: 50%;
	};
`;

export const Image = styled.img`
	max-width: ${({theme}) => theme.breakpoints.medium};
	width: 100%;
	padding: 30px;
`;