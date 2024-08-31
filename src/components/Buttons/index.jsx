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
    transition: 0.1s filter;
    box-shadow: 3px 3px 1px rgba(0, 0, 0, 1);

    &:hover {
        filter: brightness(1.1);
    }

    &:active {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
    }
    
    &:disabled {
        filter: brightness(1);
        background-color: rgba(156, 100, 72, 0.3);
        box-shadow: 3px 3px 1px rgba(0, 0, 0, .6);
        cursor: auto;
        border-color: rgba(156, 100, 72, 0.3);
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