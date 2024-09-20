import styled from "styled-components";

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    justify-items: center;
    align-self: center;
    padding: 0 10px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 10px;
        align-self: center;
    }
`;

export const BoardsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    width: clamp(320px, 80vw, 500px);
    gap: 20px;
`;

export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    gap: 20px;
    justify-self: start;
    width: 89%;
    margin: 30px 0 30px 30px;

    @media (max-width: 900px) {
        margin: 0 0 30px 30px;
    }
`;

export const Info = styled.div`
    background-color: #9c6448;
    color: white;
    border: 2px solid black;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    //margin: 10px 0 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
    font-size: clamp(1rem, 4vw, 1.3rem);
    font-weight: bold;
    letter-spacing: 2px;
    padding: 10px;
    width: 100%;
    text-align: center;
    line-height: 1.5;

    li {
        text-align: left;
        margin-left: 10px;;
    }

    p {
        margin: 0 0 20px;
    }
`;
