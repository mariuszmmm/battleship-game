import styled, {css} from "styled-components";
import {Link} from 'react-router-dom';

const disabledStyles = css`
    background-color: ${({theme}) =>
            theme.colors.button.disabledBackgroundColor};
    box-shadow: ${({theme}) =>
            theme.boxShadow.disabledButton};
    cursor: auto;
    border-color: ${({theme}) =>
            theme.colors.button.disabled};
`;

const buttonStyles = css`
    background-color: ${({theme, $shot}) => $shot ?
            "red" : theme.colors.button.backgroundColor};
    color: ${({theme}) => theme.colors.button.text};
    padding: 10px 15px;
    border: 2px solid ${({theme}) =>
            theme.colors.button.borderColor};
    border-radius: 10px;
    min-width: max-content;
    max-width: 120px;
    font-size: 1.3rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: 0.2s background-color, 0.5s color;
    box-shadow: ${({theme}) =>
            theme.boxShadow.button};

    &:hover {
        background-color: rgba(146, 90, 62, 1)
    }
;

    ${({theme, $shot}) => theme && css`
        ${$shot ? "transition: 0s background-color, 0s color" :
                "transition: 0.2s background-color, 0.3s color"
        }
        &:hover {
            ${({theme, $shot}) => theme && $shot && css`
                background-color: red;
            `}

        }

    `};


    ${({theme}) => theme && css`
        &:hover {
            ${({theme, $setting}) => theme && $setting && css`
                background-color: rgba(34, 236, 34, .3)
            `};
        }
    `}
    &:active {
        box-shadow: ${({theme}) =>
                theme.boxShadow.activeButton};
        transform: translate(1px, 1px);
        ${({theme, $setting}) => theme && css`
            ${$setting ? "background-color: rgba(0, 255, 0, 1)" :
                    theme.colors.button.backgroundColor}
        `}
    }

    &:disabled {
        ${disabledStyles};
        color: grey;
    }

    ${({$disabled}) => $disabled && css`
        ${disabledStyles}
    `};

    @media (max-width: 700px ) {
        padding: 10px;
    }
`;


export const Button = styled.button`
    ${buttonStyles};
    ${({$area}) => $area && css`
        width: 100%;
        grid-area: ${$area};
    `};
    ${({$area}) => $area === "random" && css`
        margin: 20px 0;

        @media (max-width: 700px ) {
            margin: 10px 0;
        }
    `};

    ${({theme, $active}) => theme && $active && css`
        box-shadow: ${({theme}) =>
                theme.boxShadow.activeButton};
        background-color: ${theme.colors.specialColor};
        transform: translate(1px, 1px);

        ${({theme, disabled}) => theme && css`
            color: ${disabled ? theme.colors.button.disabled : "black"};
        `}
        &:hover {
            background-color: rgba(0, 255, 0, 1);
        }

    `}

    ${({theme, $setting}) => theme && $setting && css`
        width: 100%;
    `}

`;

export const StyledLink = styled(Link)`
    ${buttonStyles};
    text-decoration: none;
`;

export const Back = styled(Link)`
    ${buttonStyles};
    align-self: flex-start;
    padding: 10px;

    @media (max-width: 700px ) {
        padding: 5px;
    }
`;

export const Home = styled.button`
    ${buttonStyles};
    align-self: flex-start;
    padding: 10px;

    @media (max-width: 700px ) {
        padding: 5px;
    }
 `;