import styled, {css} from "styled-components";
import {Link} from 'react-router-dom';

const buttonStyles = css`
    background-color: ${({theme}) =>
            theme.colors.button.backgroundColor};
    color: ${({theme}) => theme.colors.button.text};
    padding: 10px 15px;
    border: 2px solid ${({theme}) =>
            theme.colors.button.borderColor};
    border-radius: 10px;
    min-width: max-content;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: 0.1s filter;
    box-shadow: ${({theme}) =>
            theme.boxShadow.button};

    &:hover {
        filter: brightness(1.1);
    }
;

    &:active {
        box-shadow: ${({theme}) =>
                theme.boxShadow.activeButton};
    }
;

    &:disabled {
        filter: brightness(1);
        background-color: ${({theme}) =>
                theme.colors.button.disabledBackgroundColor};
        box-shadow: ${({theme}) =>
                theme.boxShadow.disabledButton};
        cursor: auto;
        border-color: ${({theme}) =>
                theme.colors.button.disabledBorderColor};
    }
;
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
`;