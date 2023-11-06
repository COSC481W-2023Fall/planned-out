import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  .btn, .btn.active {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  div.react-calendar button {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;