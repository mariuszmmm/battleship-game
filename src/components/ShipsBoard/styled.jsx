import styled, {css} from "styled-components";

export const ShipsBoardWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(10, 10%);
    grid-template-columns: repeat(10, 10%);
    grid-auto-flow: column;
    width: 600px;
    aspect-ratio: 1/1;
    border: 3px solid #2b2b2b;
    margin-left: 60px;
    position: relative;

    @media (max-width: 1200px) {
        margin: 0 30px;
    }

    @media (max-width: 700px) {
        width: 85vw;
    }
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

    ${({$ship}) => !$ship && css`
        &:hover {
            filter: brightness(0.9);
        }
    `};

    ${({$targeted}) => $targeted && css`
        background-color: #c3c3c3;
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
    background-color: ${({$selected}) => $selected ? "#22ec22" : "#2424fe"};
    width: 100%;
    height: 100%;
    position: absolute;
    outline: 1px solid black;
    border-radius: 45%;
    margin: 20px;
    border: 2px solid black;
    transition: .3s filter, .3s background-color;

    &:hover {
        filter: brightness(0.9);
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