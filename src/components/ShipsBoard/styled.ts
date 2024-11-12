import styled, {css} from "styled-components";
import {rgba} from "polished";

interface BoardCellProps {
	$hovered: boolean;
	$compVsComp: boolean;
	$targetedLine: boolean;
	$targeted: boolean;
}

interface ShipItemProps {
	$compVsComp: boolean;
	$top: boolean;
	$right: boolean;
	$bottom: boolean;
	$left: boolean;
	$selected: boolean;
	$sunk: boolean;
}

interface EmptyProps {
	$reserved: boolean;
	$warning: boolean;
}

export const ShipsBoardWrapper = styled.div<{ $toLeft: boolean }>`
	display: grid;
	grid-template-rows: repeat(10, 10%);
	grid-template-columns: repeat(10, 10%);
	grid-auto-flow: column;
	justify-content: end;
	width: clamp(280px, 72vw, 450px);
	aspect-ratio: 1/1;
	border: 3px solid ${({theme}) => theme.colors.primaryColor};
	position: relative;
	transition: 1s transform;
	margin: 30px 0 10px 30px;
	
	${({$toLeft}) => $toLeft && css`
		transform: translateX(calc(-100% - 50px));
	`};
`;

export const BoardCell = styled.div<BoardCellProps>`
	background-color: ${({theme}) => theme.colors.textColor};
	border: 1px solid ${({theme}) => theme.colors.semiTransparent};
	display: flex;
	align-items: center;
	justify-content: center;
	border-collapse: collapse;
	aspect-ratio: 1/1;
	position: relative;
	transition: .2s filter;
	
	&:hover {
		${({$hovered}) => $hovered && css`
			filter: brightness(0.9);
		`};
		${({$compVsComp}) => $compVsComp && css`
			filter: none;
		`})
	}
	
	${({$targetedLine}) => $targetedLine && css`
		filter: brightness(0.95);
	`};
	
	${({$targeted}) => $targeted && css`
		filter: brightness(0.8);
	`};
`;

export const ColName = styled.div`
	color: ${({theme}) => theme.colors.primaryColor};
	position: absolute;
	top: calc(-1.2rem - 10px);
	font-size: 1.2rem;
	text-align: center;
	width: 100%;
`;

export const RowName = styled.div`
	color: ${({theme}) => theme.colors.primaryColor};
	position: absolute;
	left: calc(-100% - 10px);
	font-size: 1.2rem;
	width: 100%;
	text-align: right;
`;

export const ShipItem = styled.div<ShipItemProps>`
	outline: 1px solid ${({theme}) => theme.colors.primaryColor};
	border: 1px solid ${({theme}) => theme.colors.primaryColor};
	width: 100%;
	height: 100%;
	position: absolute;
	border-radius: 35%;
	transition: .3s filter, .3s background-color;
	
	&:hover {
		${({$compVsComp}) => $compVsComp && css`
			filter: none;
		`});
	}
	
	${({$top}) => $top && css`
		border-top-right-radius: 0;
		border-top-left-radius: 0;
		border-top: 0;
	`};
	${({$right}) => $right && css`
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-right: 0;
	`};
	${({$bottom}) => $bottom && css`
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		border-bottom: 0;
	`};
	${({$left}) => $left && css`
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-left: 0;
	`};
	
	${({$selected, theme}) => theme && css`
		background-color: ${$selected ?
			theme.colors.specialColor : theme.colors.tertiaryColor}
	`};
	
	${({$sunk}) => $sunk && css`
		filter: brightness(.5);
		opacity: 0.3;
	`};
`;

export const Empty = styled.div<EmptyProps>`
	width: 100%;
	height: 100%;
	position: absolute;
	transition: .3s background-color;
	
	${({$reserved}) => $reserved && css`
		background-color: ${({theme}) => rgba(theme.colors.tertiaryColor, 0.1)};
	`};
	
	${({$warning}) => $warning && css`
		background-color: ${({theme}) => rgba(theme.colors.specialColor_2, 0.15)};
	`};
`;