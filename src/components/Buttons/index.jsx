import styled, {css} from "styled-components";
import {Link} from 'react-router-dom';

const buttonStyles = css`
    background-color: #9c6448;
    color: white;
    padding: 10px 15px;
    border: 2px solid black;
    border-radius: 10px;
    min-width: max-content;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.7);
    }
`;

export const Button = styled.button`
    ${buttonStyles};

    ${({$area}) => $area && css`
        width: 100%;
        grid-area: ${$area};
    `};
    ${({$area}) => ($area === "random" || $area === "check-on") && css`
        margin: 20px 0;
    `};
`;

export const StyledLink = styled(Link)`
    ${buttonStyles};
    text-decoration: none;
    margin: 30px 0;
`;

export const Back = styled(Link)`
    ${buttonStyles};
    text-decoration: none;
    align-self: flex-start;
    padding: 10px;
`