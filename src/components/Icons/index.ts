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

interface IconProps {
	$active?: boolean;
}

const iconStyle = css<IconProps>`
	fill: currentColor;
	width: 30px;
	height: 30px;
	
	${({$active, theme}) => $active && css`
		fill: ${theme.colors.primaryColor};
	`}
`;

export const ArrowLeftIcon = styled(ArrowLeft)<IconProps>`
	${iconStyle};
	width: 50px;
	height: 50px;
`;

export const ArrowTopIcon = styled(ArrowLeftIcon)`
	transform: rotate(90deg);
`;

export const ArrowRightIcon = styled(ArrowLeftIcon)`
	transform: rotate(180deg);
`;

export const ArrowDownIcon = styled(ArrowLeftIcon)`
	transform: rotate(270deg);
`;

export const RotateRightIcon = styled(RotateRight)<IconProps>`
	${iconStyle};
	width: 50px;
	height: 50px;
`;

export const CheckIcon = styled(Check)<IconProps>`
	${iconStyle};
	width: 50px;
	height: 50px;
`;

export const RandomIcon = styled(Random)<IconProps>`
	${iconStyle};
`;

export const ArrowBackIcon = styled(ArrowLeftIcon)<IconProps>`
	${iconStyle};
`;

export const ArrowForwardIcon = styled(ArrowLeftIcon)<IconProps>`
	${iconStyle};
	transform: rotate(180deg);
`;

export const XMarkIcon = styled(XMark)<IconProps>`
	${iconStyle};
	fill: ${({theme}) => theme.colors.backgroundColor};
	width: 100%;
	height: 100%;
`;

export const CircleIcon = styled(Circle)<IconProps>`
	${iconStyle};
	fill: ${({theme}) => theme.colors.backgroundColor};
	width: 30%;
	height: 30%;
`;

export const CrossHairsIcon = styled(CrossHairs)<IconProps>`
	${iconStyle};
	fill: ${({theme}) => theme.colors.specialColor_2};
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 2;
`;

export const FireIcon = styled(Fire)<IconProps>`
	${iconStyle};
	width: 110%;
	height: 110%;
	z-index: 1;
	position: absolute;
	padding-bottom: 3px;
`;

export const UserIcon = styled(User)<IconProps>`
	${iconStyle};
	
	@media (max-width: ${({theme}) => theme.breakpoints.medium}) {
		width: 26px;
		height: 26px;
	}
`;

export const DesktopIcon = styled(Desktop)<IconProps>`
	${iconStyle};
	
	@media (max-width: ${({theme}) => theme.breakpoints.medium}) {
		width: 26px;
		height: 26px;
	}
`;

