import styled, {css} from "styled-components";
import {ReactComponent as Play} from "../../assets/play.svg";
import {ReactComponent as Random} from "../../assets/arrows-spin.svg";
import {ReactComponent as ArrowLeft} from "../../assets/arrow-left.svg";
import {ReactComponent as ArrowTop} from "../../assets/arrow-top.svg";
import {ReactComponent as ArrowRight} from "../../assets/arrow-right.svg";
import {ReactComponent as ArrowDown} from "../../assets/arrow-down.svg";
import {ReactComponent as Check} from "../../assets/check.svg";
import {ReactComponent as RotateRight} from "../../assets/arrow-rotate-right.svg";
import {ReactComponent as Xmark} from "../../assets/xmark.svg";

const iconStyles = css`
    width: 50px;
    height: 50px;
    fill: white;

    @media (max-width: 700px ) {
        width: 26px;
        height: 26px;
    }
`;

export const PlayIcon = styled(Play)`
    ${iconStyles};
    width: 26px;
    height: 26px;
`;

export const RandomIcon = styled(Random)`
    ${iconStyles}
`;

export const RotateRightIcon = styled(RotateRight)`
    ${iconStyles}
`;

export const ArrowLeftIcon = styled(ArrowLeft)`
    ${iconStyles}
`;

export const ArrowTopIcon = styled(ArrowTop)`
    ${iconStyles}
`;

export const ArrowRightIcon = styled(ArrowRight)`
    ${iconStyles}
`;

export const ArrowDownIcon = styled(ArrowDown)`
    ${iconStyles}
`;

export const CheckIcon = styled(Check)`
    ${iconStyles}
`;

export const ArrowBackIcon = styled(ArrowLeftIcon)`
    width: 26px;
    height: 26px;
`;

export const XmarkIcon = styled(Xmark)`
    ${iconStyles}
`;