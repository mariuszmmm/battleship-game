import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  margin: 20px;
`;

export const Header = styled.h2`
  color: ${({ theme }) => theme.color.red};

  ${({ $isEven }) =>
    $isEven &&
    css`
      color: ${({ theme }) => theme.color.blue};
    `}
`;

export const Button = styled.button`
  padding: 8px 16px;
  margin: 0 8px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
`;
