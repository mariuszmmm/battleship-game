import styled from "styled-components";

export const Wrapper = styled.div`
	background-color: ${({theme}) => theme.colors.semiTransparent};
	position: fixed;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(8px);
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Overlay = styled.div`
	background-color: ${({theme}) => theme.colors.secondaryColor};
	color: ${({theme}) => theme.colors.textColor};
	border: 2px solid ${({theme}) => theme.colors.primaryColor};;
	border-radius: 10px;
	width: clamp(300px, 50vw, 500px);
	font-size: clamp(1rem, 2.7vw, 1.5rem);
	letter-spacing: 1px;
	padding: 20px 5px;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	table {
		width: 85%;
		margin: 0 50px 25px;
	}
	
	caption {
		border-bottom: 1px solid ${({theme}) => theme.colors.textColor};;
		padding-bottom: 15px;
		margin-bottom: 15px;
	}
	
	td {
		padding-left: 20px;
	}
`;