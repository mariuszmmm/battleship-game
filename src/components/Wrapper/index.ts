import styled from "styled-components";

export const Wrapper = styled.div`
	background-color: ${({theme}) => theme.colors.backgroundColor};
	min-width: ${({theme}) => theme.breakpoints.small};
	padding: clamp(5px, 2vw, 20px);
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;