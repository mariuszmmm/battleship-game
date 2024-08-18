import styled from "styled-components";

export const PlayWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: darkgray;
    width: 100vw;
    height: 100vh;`;

export const BoardSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    padding: clamp(15px, 5vw, 50px);
    background-color: #9b9898;
`;

export const ShipsBoard = styled.div`
    display: grid;
    grid-template-rows: repeat(10, 10%);
    grid-template-columns: repeat(10, 10%);
    grid-auto-flow: column;
    min-width: 80%;
    width: 60vh;
    aspect-ratio: 1/1;
    border: 3px solid #2b2b2b;
`;

export const BoardCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid lightgrey;
    border-collapse: collapse;
    aspect-ratio: 1/1;
    position: relative;
`

export const ColName = styled.div`
    position: absolute;
    top: calc(-60% - 8px);
    color: black;
    text-align: center;
    width: 100%;
`;

export const RowName = styled.div`
    position: absolute;
    left: calc(-100% - 8px);
    color: black;
    width: 100%;
    text-align: right;
`;

export const ShipItem = styled.div`
    background-color: blue;
    width: 100%;
    height: 100%;
    position: absolute;
    outline: 1px solid blue;
`

export const Reserved = styled.div`
    background-color: #d6f4ff;
    width: 100%;
    height: 100%;
    position: absolute;
    outline: 1px solid darkgrey;
`

export const Button = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
`