import styled from "styled-components";

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: start;
    justify-items: center;
    padding: 50px 10px;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px 10px;
    }
`;

export const BoardsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    width: clamp(360px, 92vw, 510px);
    padding-top: 25px;
`;

export const InfoWrapper = styled.div`
		margin: 20px 40px 0 60px;
    width: clamp(300px, 80vw, 450px);
`;

export const Info = styled.div`
    background-color: #9c6448;
    color: white;
    border: 2px solid black;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
    font-size: clamp(1rem, 4vw ,1.3rem);
    font-weight: bold;
    letter-spacing: 2px;
    padding: 10px;
    width: 100%;
    text-align: center;
    line-height: 1.5;
    aspect-ratio: 1/1;

    li {
        text-align: left;
        margin-left: clamp(25px, 8vw ,70px);;
    }

    p {
        margin: 0 0 20px;
    }
`;
