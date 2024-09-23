import styled from "styled-components";

export const Item = styled.li`
    list-style: none;
		display: flex;
		justify-content: space-between;
		width: 103%;
`;

export const List = styled.ul`
    margin: -20px 0 20px 20px;
    padding: 0;
	
    @media (max-width: 900px) {
        margin-left: 55px;
    }
`;