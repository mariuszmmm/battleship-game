import styled, {css} from "styled-components";
import {Link} from 'react-router-dom';

const buttonStyles = css`
    background-color: #9c6448;
    color: white;
    padding: 10px;
    border: 2px solid black;
    border-radius: 10px;
    min-width: max-content;
    font-size: 1.5rem;
    margin: 10px 0 50px;
    max-width: max-content;
`;

export const Back = styled(Link)`
    text-decoration: none;
    background-color: #9c6448;
    color: white;
    padding: 3px 3px 0px 3px;
    border: 2px solid black;
    border-radius: 10px;
    min-width: max-content;
    align-self: flex-start;
    margin: 10px;
`

export const Button = styled.button`
    ${buttonStyles};
`;

export const StyledLink = styled(Link)`
    ${buttonStyles};
    text-decoration: none;
`;