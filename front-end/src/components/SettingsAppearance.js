import Card from "react-bootstrap/Card";
import { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../themes/GlobalStyles.js';
import { useTheme } from '../themes/useTheme';
import ThemeSelector from '../themes/themeSelector.js';

const SettingsCard = (props) => {

    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);
    useEffect(() => {
        setSelectedTheme(theme);
    }, [themeLoaded]);

    return (
        themeLoaded && <ThemeProvider theme={selectedTheme}>
            <GlobalStyles />
            <Card className="settings-card">
                <Card.Title>Appearance</Card.Title>
                <ThemeSelector setter={ setSelectedTheme }/>
            </Card>
        </ThemeProvider>
    )

}

export default SettingsCard;