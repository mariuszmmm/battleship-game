import styled, {css} from "styled-components";

export const ShipsBoardWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(10, 10%);
    grid-template-columns: repeat(10, 10%);
    grid-auto-flow: column;
    width: clamp(280px, 72vw, 450px);
    aspect-ratio: 1/1;
    border: 3px solid #2b2b2b;
    position: relative;
    transition: 1s transform;
    margin: 30px 0 30px 30px;

    ${({$toLeft}) => $toLeft && css`
        transform: translateX(calc(-100% - 50px));
    `};
`;

export const BoardCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #c6c6c6;
    border-collapse: collapse;
    aspect-ratio: 1/1;
    position: relative;
    transition: 0.2s filter;

    &:hover {
        ${({$hovered}) => $hovered && css`
            filter: brightness(0.9);
        `};
        ${({$compVsComp}) => $compVsComp && css`
            filter: none;
        `})
    }

    ${({$targetedLine}) => $targetedLine && css`
        background-color: #eeeeee;
    `};

    ${({$targeted}) => $targeted && css`
        background-color: #bbbbbb;
    `};
`

export const ColName = styled.div`
    position: absolute;
    top: calc(-1.2rem - 8px);
    font-size: 1.2rem;
    color: black;
    text-align: center;
    width: 100%;
`;

export const RowName = styled.div`
    position: absolute;
    left: calc(-100% - 8px);
    font-size: 1.2rem;
    color: black;
    width: 100%;
    text-align: right;
`;

export const ShipItem = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    outline: 1px solid black;
    border-radius: 45%;
    margin: 20px;
    border: 2px solid black;
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
    `}
    ${({$right}) => $right && css`
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 0;
    `}
    ${({$bottom}) => $bottom && css`
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom: 0;
    `}
    ${({$left}) => $left && css`
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: 0;
    `}

    ${({$selected, theme}) => theme && css`
        background-color: ${$selected ?
                theme.colors.specialColor : "#2424fe"}
    `};

    ${({$sunk}) => $sunk && css`
        filter: brightness(.5);
        opacity: 0.5;
    `}
`

export const Empty = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    transition: .3s background-color;

    ${({$reserved}) => $reserved && css`
        background-color: #d6f4ff;
    `};

    ${({$warning}) => $warning && css`
        background-color: #f8c2c2;
    `};
`