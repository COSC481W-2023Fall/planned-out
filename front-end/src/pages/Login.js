import Container from "react-bootstrap/Container";
import LoginForm from "../components/LoginForm.js";
import "./login.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../themes/GlobalStyles.js';
import { useTheme } from '../themes/useTheme';
import { useState, useEffect } from "react";

const Login = () => {

  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme, themeLoaded]);

  return (
    themeLoaded && <ThemeProvider theme={selectedTheme}>
      <GlobalStyles />
      <div className="App">
        <Container className="login-container">
          <LoginForm />
        </Container>
      </div>
    </ThemeProvider>
  );
};
export default Login;
