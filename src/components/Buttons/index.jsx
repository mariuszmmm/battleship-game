import styled, {css} from "styled-components";
import {Link} from 'react-router-dom';

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 0 5px;
    ${({$area}) => $area && css`
        grid-area: ${$area};
    `};
`;

const disabledStyles = css`
    background-color: ${({theme}) => theme.colors.button.disabledBackgroundColor};
    box-shadow: ${({theme}) => theme.boxShadow.disabledButton};
    border-color: ${({theme}) => theme.colors.button.disabled};
    cursor: auto;
`;

const buttonStyles = css`
    background-color: ${({theme}) => theme.colors.button.backgroundColor};
    color: ${({theme}) => theme.colors.button.textColor};
    box-shadow: ${({theme}) => theme.boxShadow.button};
    border: 2px solid ${({theme}) => theme.colors.button.borderColor};
    font-weight: ${({theme}) => theme.fontWeight.medium};
    font-size: 1.3rem;
    padding: 10px 15px;
    border-radius: 10px;
    min-width: max-content;
    max-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: .3s background-color, .6s color;

    &:hover {
        background-color: ${({theme}) => theme.colors.button.hoveredBackgroundColor};
    }

    &:active {
        box-shadow: ${({theme}) => theme.boxShadow.activeButton};
        transform: translate(1px, 1px);
    }

    &:disabled {
        ${disabledStyles};
        transform: translate(0px, 0px);
        color: ${({theme}) => theme.colors.button.disabled};
    }

    @media (max-width: ${({theme}) => theme.breakpoints.medium}) {
        padding: 10px;
    };
`;

export const Button = styled.button`
    ${buttonStyles};
    ${({$area}) => $area && css`
        grid-area: ${$area};
        width: 100%;
        ${$area === "random" && css`
            margin: 10px 0;
            max-width: 270px;
            @media (max-width: ${({theme}) => theme.breakpoints.medium}) {
                margin: 10px 0;
            };
        `};
    `};
    ${({theme, $active}) => $active && css`
        box-shadow: ${({theme}) => theme.boxShadow.activeButton};
        background-color: ${theme.colors.button.activeBackgroundColor};
        transform: translate(1px, 1px);

        ${({theme, disabled}) => theme && css`
            color: ${disabled ? theme.colors.button.disabled : theme.colors.button.activeSpecialColor};
        `}
        &:hover {
            background-color: ${({theme}) => theme.colors.button.activeSpecialBackgroundColor};
        }
    `}
    ${({$setting}) => $setting && css`
        width: 100%;
    `}
    ${({$shot}) => $shot && css`
        background-color: ${({theme}) => theme.colors.button.shotBackgroundColor};
        transition: 0s background-color;

        &:hover {
            background-color: ${({theme}) => theme.colors.button.hoveredShotBackgroundColor};
        }

        &:disabled {
            transition: 0s background-color;
            background-color: ${({theme}) => theme.colors.button.backgroundColor};
        }
    `};
`;

export const StyledLink = styled(Link)`
    ${buttonStyles};
    text-decoration: none;
    padding: 10px;
    width: 130px;

    ${({$disabled}) => $disabled && css`
        ${disabledStyles}
    `};
`;


