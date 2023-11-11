import Container from "react-bootstrap/Container";
import RegistrationForm from "../components/RegistrationForm.js";
import "./registration.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../themes/GlobalStyles.js';
import { useTheme } from '../themes/useTheme';
import { useState, useEffect } from "react";

const Registration = () => {

  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme, themeLoaded]);

  return (
    themeLoaded && <ThemeProvider theme={selectedTheme}>
      <GlobalStyles />
      <div className="App">
        <Container className="registration-container">
          <RegistrationForm />
        </Container>
      </div>  
    </ThemeProvider>
  );
};
export default Registration;
