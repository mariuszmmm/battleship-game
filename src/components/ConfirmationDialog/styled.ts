import styled from "styled-components";
import background from "../../assets/Images/background.jpg";

export const Wrapper = styled.div`
	background-color: ${({theme}) => theme.colors.backgroundColor};
	background-image: url(${background});
	background-size: cover;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(8px);
	z-index: 100;
`;

export const Overlay = styled.div`
	background-color: ${({theme}) => theme.colors.secondaryColor};
	color: ${({theme}) => theme.colors.textColor};
	border: 2px solid ${({theme}) => theme.colors.primaryColor};
	width: clamp(290px, 50vw, 400px);
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	letter-spacing: 1px;
	font-size: 1.5rem;
`;