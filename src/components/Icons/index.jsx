import styled, {css} from "styled-components";
import {ReactComponent as Play} from "../../assets/play.svg";
import {ReactComponent as Random} from "../../assets/arrows-spin.svg";
import {ReactComponent as ArrowLeft} from "../../assets/arrow-left.svg";
import {ReactComponent as ArrowTop} from "../../assets/arrow-top.svg";
import {ReactComponent as ArrowRight} from "../../assets/arrow-right.svg";
import {ReactComponent as ArrowDown} from "../../assets/arrow-down.svg";
import {ReactComponent as Check} from "../../assets/check.svg";
import {ReactComponent as RotateRight} from "../../assets/arrow-rotate-right.svg";
import {ReactComponent as X_mark} from "../../assets/xmark.svg";
import {ReactComponent as CrossHairs} from "../../assets/crosshairs.svg";
import {ReactComponent as Fire} from "../../assets/fire.svg";
import {ReactComponent as User} from "../../assets/user.svg";
import {ReactComponent as Desktop} from "../../assets/desktop.svg";
import {ReactComponent as Home} from "../../assets/home.svg";


const iconStyles = css`
    width: 100%;
    height: 100%;
    fill: white;
`;

export const PlayIcon = styled(Play)`
    ${iconStyles};
    width: 26px;
    height: 26px;
`;

export const RandomIcon = styled(Random)`
    ${iconStyles};
    width: 35px;
    height: 35px;
`;

export const RotateRightIcon = styled(RotateRight)`
    ${iconStyles};
    width: 50px;
    height: 50px;
`;

export const ArrowLeftIcon = styled(ArrowLeft)`
    ${iconStyles};
    width: 50px;
    height: 50px;
`;

export const ArrowTopIcon = styled(ArrowTop)`
    ${iconStyles};
    width: 50px;
    height: 50px;
`;

export const ArrowRightIcon = styled(ArrowRight)`
    ${iconStyles};
    width: 50px;
    height: 50px;
`;

export const ArrowDownIcon = styled(ArrowDown)`
    ${iconStyles};
    width: 50px;
    height: 50px;
`;

export const CheckIcon = styled(Check)`
    ${iconStyles};
    width: 50px;
    height: 50px;
`;

export const ArrowBackIcon = styled(ArrowLeftIcon)`
    ${iconStyles};
    width: 26px;
    height: 26px;
`;

export const HomeIcon = styled(Home)`
    ${iconStyles};
    width: 26px;
    height: 26px;
`;

export const X_markIcon = styled(X_mark)`
    ${iconStyles};
    width: 100%;
    height: 100%;
    ${({$board}) => $board && css`
        fill: black;
    `}
`;

export const CrossHairsIcon = styled(CrossHairs)`
    ${iconStyles};
    position: absolute;
    fill: red;
    width: 100%;
    height: 100%;
    z-index: 2;
`;

export const FireIcon = styled(Fire)`
    ${iconStyles};
    z-index: 1;
    position: absolute;
    padding-bottom: 5px;
`;

export const UserIcon = styled(User)`
    ${iconStyles};
    width: 30px;
    height: 30px;
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
    ${({$active}) => $active && css`
        fill: black;
    `}
`;
