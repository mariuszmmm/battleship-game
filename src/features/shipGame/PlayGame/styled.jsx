import styled from "styled-components";

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    //gap: 50px;
    align-items: start;
    justify-items: center;
		align-self: center;
    padding: 0 10px;
    //padding: 30px 30px 30px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 10px;
        align-self: center;

    }
`;

export const BoardsWrapper = styled.div`
    display: grid;
    grid-template-columns: 100% 1fr;
    overflow: hidden;
		
    width: clamp(320px, 80vw, 500px);

    //width: clamp(310px, 44vw, 450px);
		
    //padding-top: 25px;
    //padding-left: 7%;
    //gap: 80px;
`;

export const InfoWrapper = styled.div`
		margin-top: 30px;
    //width: clamp(300px, 80vw, 450px);
    //width: clamp(280px, 86vw, 510px);
    //width: 100%;
		display: flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
		gap: 20px;

    @media (max-width: 900px) {
      margin: 0;
		  
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
    font-size: clamp(1rem, 4vw ,1.3rem);
    font-weight: bold;
    letter-spacing: 2px;
    padding: 10px;
    width: 105%;
    text-align: center;
    line-height: 1.5;
    aspect-ratio: 1/1;

    li {
        text-align: left;
        margin-left: 10px;;
    }

    p {
        margin: 0 0 20px;
    }
`;
