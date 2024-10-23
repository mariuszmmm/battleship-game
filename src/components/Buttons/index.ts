import styled, {css, keyframes} from "styled-components";
import {Link} from 'react-router-dom';
import {rgba} from "polished";

interface ButtonsContainerProps {
	$area?: string;
}

interface ButtonProps {
	$area?: string;
	$active?: boolean;
	$setting?: boolean;
	$shot?: boolean;
	$disabled?: boolean;
	$animation?: boolean;
}

const shine = keyframes`
	0% {
		opacity: 0;
	}
	59% {
		opacity: 0
	}
	60% {
		background-position: -500px 0;
		opacity: 1
	}
	75% {
		background-position: 500px 0;
	}
	76% {
		opacity: 0
	}
	100% {
		opacity: 0
	}
`;

export const ButtonsContainer = styled.div<ButtonsContainerProps>`
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
	background-color: ${({theme}) => rgba(theme.colors.button.backgroundColor, 0.3)};
	box-shadow: ${({theme}) => theme.boxShadow.disabledButton};
	border-color: ${({theme}) => rgba(theme.colors.button.borderColor, 0.3)};
	color: ${({theme}) => rgba(theme.colors.button.textColor, 0.4)};
	cursor: not-allowed;
`;

const buttonStyles = css<ButtonProps>`
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
	position: relative;
	overflow: hidden;
	
	${({$animation}) => $animation && css`
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: -280px;
			width: 800px;
			height: 100%;
			background: linear-gradient(120deg, transparent, ${({theme}) =>
				rgba(theme.colors.textColor, 0.7)}, transparent);
			z-index: 1;
			transform: skewX(-20deg);
			animation: ${shine} 3.2s ease-in-out infinite;
		}
		
		&:hover:before {
			background: ${({theme}) => theme.colors.button.hoveredBackgroundColor};
			animation: none;
			z-index: -1;
		}
	`};
	
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
		transition: 0s background-color;
	}
	
	@media (max-width: ${({theme}) => theme.breakpoints.medium}) {
		padding: 10px;
	};
`;

export const Button = styled.button<ButtonProps>`
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
		color: ${theme.colors.button.activeSpecialColor};
		transform: translate(1px, 1px);
		
		&:hover {
			background-color: ${({theme}) => theme.colors.button.activeSpecialBackgroundColor};
		}
	`}
	${({$setting}) => $setting && css`
		width: 100%;
		
		&:active {
			background-color: ${({theme}) => rgba(theme.colors.button.activeBackgroundColor, 0.5)};
		}
	`}
	${({$shot}) => $shot && css`
		background-color: ${({theme}) => theme.colors.button.shotBackgroundColor};
		transition: 0s background-color;
		
		&:hover:before {
			background-color: ${({theme}) => theme.colors.button.hoveredShotBackgroundColor};
		}
		
		&:not([disabled]):hover {
			background-color: ${({theme}) => theme.colors.button.hoveredShotBackgroundColor};
		}
	`};
`;

export const StyledLink = styled(Link)<ButtonProps>`
	${buttonStyles};
	text-decoration: none;
	padding: 10px;
	width: 130px;
	
	${({$disabled}) => $disabled && css`
		${disabledStyles};
		pointer-events: none;
	`};
`;