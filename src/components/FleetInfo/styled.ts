import styled from "styled-components";

export const List = styled.ul`
	margin: -20px 0 20px 20px;
	padding: 0;
	
	@media (max-width: ${({theme}) => theme.breakpoints.big}) {
		margin-left: 55px;
	}
`;

export const Item = styled.li`
	list-style: none;
	display: flex;
	justify-content: space-between;
	width: 103%;
`;