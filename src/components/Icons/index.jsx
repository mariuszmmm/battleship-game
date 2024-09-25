import styled, {css} from "styled-components";
import {ReactComponent as Random} from "../../assets/Images/arrows-spin.svg";
import {ReactComponent as ArrowLeft} from "../../assets/Images/arrow-left.svg";
import {ReactComponent as Check} from "../../assets/Images/check.svg";
import {ReactComponent as RotateRight} from "../../assets/Images/arrow-rotate-right.svg";
import {ReactComponent as XMark} from "../../assets/Images/xmark.svg";
import {ReactComponent as Circle} from "../../assets/Images/circle.svg";
import {ReactComponent as CrossHairs} from "../../assets/Images/crosshairs.svg";
import {ReactComponent as Fire} from "../../assets/Images/fire.svg";
import {ReactComponent as User} from "../../assets/Images/user.svg";
import {ReactComponent as Desktop} from "../../assets/Images/desktop.svg";

const iconStyles = css`
    fill: ${({theme}) => theme.colors.textColor};
`;

export const ArrowLeftIcon = styled(ArrowLeft)`
    ${iconStyles};
    width: 50px;
    height: 50px;
`;

export const ArrowTopIcon = styled(ArrowLeftIcon)`
    ${iconStyles};
    rotate: 90deg;
`;

export const ArrowRightIcon = styled(ArrowLeftIcon)`
    ${iconStyles};
    rotate: 180deg;
`;

export const ArrowDownIcon = styled(ArrowLeftIcon)`
    ${iconStyles};
    rotate: 270deg;
`;

export const RotateRightIcon = styled(RotateRight)`
    ${iconStyles};
    width: 50px;
    height: 50px;
`;

export const CheckIcon = styled(Check)`
    ${iconStyles};
    width: 50px;
    height: 50px;
`;

export const RandomIcon = styled(Random)`
    ${iconStyles};
    width: 30px;
    height: 30px;
`;

export const ArrowBackIcon = styled(ArrowLeftIcon)`
    ${iconStyles};
    width: 30px;
    height: 30px;
`;

export const ArrowForwardIcon = styled(ArrowLeftIcon)`
    ${iconStyles};
    rotate: 180deg;
    width: 30px;
    height: 30px;
`;

export const XMarkIcon = styled(XMark)`
    ${iconStyles};
    width: 100%;
    height: 100%;
    fill: ${({theme}) => theme.colors.backgroundColor};
`;

export const CircleIcon = styled(Circle)`
    ${iconStyles};
    width: 30%;
    height: 30%;
    fill: ${({theme}) => theme.colors.backgroundColor};
`;

export const CrossHairsIcon = styled(CrossHairs)`
    ${iconStyles};
    width: 100%;
    height: 100%;
    position: absolute;
    fill: red;   // tu skończyłem zamieniać kolory
    z-index: 2;
`;

export const FireIcon = styled(Fire)`
    ${iconStyles};
    width: 110%;
    height:110%;
    z-index: 1;
    position: absolute;
    padding-bottom: 3px;
`;

export const UserIcon = styled(User)`
    ${iconStyles};
    width: 30px;
    height: 30px;

    @media (max-width: 700px) {
        width: 26px;
        height: 26px;
    }

    ${({$active}) => $active && css`
        fill: black;
    `}

    ${({theme, $disabled}) => $disabled && theme && css`
        fill: ${({theme}) =>
                theme.colors.button.disabled}
    `}
`;

export const DesktopIcon = styled(Desktop)`
    ${iconStyles};
    width: 30px;
    height: 30px;

    @media (max-width: 700px) {
        width: 26px;
        height: 26px;
    }

    ${({$active}) => $active && css`
        fill: black;
    `}
`;
