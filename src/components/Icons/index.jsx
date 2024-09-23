import styled, {css} from "styled-components";
import {ReactComponent as Play} from "../../assets/Images/play.svg";
import {ReactComponent as Random} from "../../assets/Images/arrows-spin.svg";
import {ReactComponent as ArrowLeft} from "../../assets/Images/arrow-left.svg";
import {ReactComponent as ArrowTop} from "../../assets/Images/arrow-top.svg";
import {ReactComponent as ArrowRight} from "../../assets/Images/arrow-right.svg";
import {ReactComponent as ArrowDown} from "../../assets/Images/arrow-down.svg";
import {ReactComponent as Check} from "../../assets/Images/check.svg";
import {ReactComponent as RotateRight} from "../../assets/Images/arrow-rotate-right.svg";
import {ReactComponent as X_mark} from "../../assets/Images/xmark.svg";
import {ReactComponent as CrossHairs} from "../../assets/Images/crosshairs.svg";
import {ReactComponent as Fire} from "../../assets/Images/fire.svg";
import {ReactComponent as User} from "../../assets/Images/user.svg";
import {ReactComponent as Desktop} from "../../assets/Images/desktop.svg";
import {ReactComponent as Home} from "../../assets/Images/home.svg";


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
    width: 26px;
    height: 26px;
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

export const ArrowForwardIcon = styled(ArrowRightIcon)`
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
		
		@media(max-width: 700px) {
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

    @media(max-width: 700px) {
        width: 26px;
        height: 26px;
    }
		
    ${({$active}) => $active && css`
        fill: black;
    `}
`;
