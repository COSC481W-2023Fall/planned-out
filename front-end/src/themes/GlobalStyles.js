import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  .btn, .btn.active, .btn:hover, .btn:disabled {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  div.nav-item .btn.active, div.nav-item .btn:hover {
    background: ${({ theme }) => theme.colors.accent} !important;
    border-color: ${({ theme }) => theme.colors.accent} !important;
  }

  div.react-calendar button {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  .form-check-input:checked[type="checkbox"] {
    background-color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  .logo{
    color: ${({ theme }) => theme.colors.accent};
    
  }
  .logo:hover{
    color: ${({ theme }) => theme.colors.accent};
  }
 body{
  // background-color: ${({ theme }) => theme.colors.accent};
 }
`;
