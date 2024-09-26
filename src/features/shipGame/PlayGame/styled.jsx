import styled from "styled-components";

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    justify-items: center;
    align-self: center;
    padding: 0 10px;

    @media (max-width: ${({theme}) => theme.breakpoints.big}) {
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

    @media (max-width: ${({theme}) => theme.breakpoints.big}) {
        margin: 0 0 30px 30px;
    };
`;

export const Info = styled.div`
    box-shadow: ${({theme}) => theme.boxShadow.container};
    background-color: ${({theme}) => theme.colors.secondaryColor};
    color: ${({theme}) => theme.colors.textColor};
    border: 2px solid ${({theme}) => theme.colors.primaryColor};
    font-weight: ${({theme}) => theme.fontWeight.medium};
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    font-size: clamp(1rem, 4vw, 1.3rem);
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

export const InfoMain = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: start;
    gap: 55px;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${({theme}) => theme.colors.textColor};

    span {
        width: max-content;
    }
`;