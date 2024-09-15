import styled from "styled-components";

export const PlayGameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    min-width: 380px;
    background-color: bisque;
    padding: 10px 10px 50px;
    min-height: calc(100vh - 60px);
`;

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
        padding: 50px 10px 20px;
    }
`;

export const BoardsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 120%;
    overflow: hidden;
    width: 510px;
		padding-top: 25px;
`;

export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;

export const Info = styled.div`
    min-width: 350px;
    background-color: #9c6448;
    color: white;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
    font-size: 1.3rem;
    font-weight: bold;
    letter-spacing: 2px;
    padding: 10px;
    width: 60%;
    text-align: center;
    line-height: 1.5;

    li {
        text-align: left;
		    margin-left: 25px;
    }

    p {
        margin: 0 0 20px;
    }
`;
