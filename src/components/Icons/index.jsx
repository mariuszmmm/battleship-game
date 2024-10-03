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

export const ArrowLeftIcon = styled(ArrowLeft)`
    fill: currentColor;
    width: 50px;
    height: 50px;
`;

export const ArrowTopIcon = styled(ArrowLeftIcon)`
    fill: currentColor;
    rotate: 90deg;
`;

export const ArrowRightIcon = styled(ArrowLeftIcon)`
    fill: currentColor;
    rotate: 180deg;
`;

export const ArrowDownIcon = styled(ArrowLeftIcon)`
    fill: currentColor;
    rotate: 270deg;
`;

export const RotateRightIcon = styled(RotateRight)`
    fill: currentColor;
    width: 50px;
    height: 50px;
`;

export const CheckIcon = styled(Check)`
    fill: currentColor;
    width: 50px;
    height: 50px;
`;

export const RandomIcon = styled(Random)`
    fill: currentColor;
    width: 30px;
    height: 30px;
`;

export const ArrowBackIcon = styled(ArrowLeftIcon)`
    fill: currentColor;
    width: 30px;
    height: 30px;
`;

export const ArrowForwardIcon = styled(ArrowLeftIcon)`
    fill: currentColor;
    rotate: 180deg;
    width: 30px;
    height: 30px;
`;

export const XMarkIcon = styled(XMark)`
    fill: ${({theme}) => theme.colors.backgroundColor};
    width: 100%;
    height: 100%;
`;

export const CircleIcon = styled(Circle)`
    fill: ${({theme}) => theme.colors.backgroundColor};
    width: 30%;
    height: 30%;
`;

export const CrossHairsIcon = styled(CrossHairs)`
    fill: ${({theme}) => theme.colors.specialColor_2};
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
`;

export const FireIcon = styled(Fire)`
    fill: currentColor;
    width: 110%;
    height: 110%;
    z-index: 1;
    position: absolute;
    padding-bottom: 3px;
`;

export const UserIcon = styled(User)`
    fill: currentColor;
    width: 30px;
    height: 30px;

    @media (max-width: ${({theme}) => theme.breakpoints.medium}) {
        width: 26px;
        height: 26px;
    }

    ${({$active}) => $active && css`
        fill: ${({theme}) => theme.colors.primaryColor};
    `}
`;

export const DesktopIcon = styled(Desktop)`
    fill: currentColor;
    width: 30px;
    height: 30px;

    @media (max-width: ${({theme}) => theme.breakpoints.medium}) {
        width: 26px;
        height: 26px;
    }

    ${({$active}) => $active && css`
        fill: ${({theme}) => theme.colors.primaryColor};
    `}
`;
