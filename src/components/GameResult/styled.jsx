import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Overlay = styled.div`
    background-color: ${({theme}) => theme.colors.secondaryColor};
    width: clamp(300px, 50vw, 500px);
    padding: 20px 5px;
    z-index: 1000;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    border-radius: 10px;
    letter-spacing: 1px;
    font-size: clamp(1rem, 2.7vw, 1.5rem);

    table {
        width: 85%;
        margin: 0 50px 25px;
    }

    caption {
        border-bottom: 1px solid white;
        padding-bottom: 15px;
        margin-bottom: 15px;
    }

    td {
        padding-left: 20px;
    }
`;