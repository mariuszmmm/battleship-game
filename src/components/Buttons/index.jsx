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
    color: ${({theme}) => theme.colors.button.text};
    border: 2px solid ${({theme}) => theme.colors.button.borderColor};
    padding: 10px 15px;
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
    transition: 0.3s background-color, .6s color;
    box-shadow: ${({theme}) =>            theme.boxShadow.button};

    ${({$area}) => $area && css`
        grid-area: ${$area};
        width: 100%;

        ${$area === "random" && css`
            margin: 15px 0;
            max-width: 270px;
            @media (max-width: ${({theme}) => theme && theme.breakpoint.medium}) {
                margin: 10px 0;
            }
        `}
    `};

    &:hover {
        background-color: rgba(140, 90, 65, 1)
    }

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
        transform: translate(0px, 0px);
        color: grey;
    }

    @media (max-width: 700px ) {
        padding: 10px;
    };
`;

export const Button = styled.button`
    ${buttonStyles};

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

    ${({$shot}) => $shot && css`
        background-color: ${({theme}) =>
                theme && theme.colors.button.shotButton};
        transition: 0s background-color;

        &:hover {
            background-color: rgba(255, 0, 0, 1);
        }

        &:disabled {
            transition: 0s background-color;
            background-color: ${({theme}) =>
                    theme.colors.button.backgroundColor};
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

// export const Back = styled(StyledLink)`
//     align-self: flex-start;
//
//     @media (max-width: 700px) {
//         padding: 5px;
//     }
// `;

