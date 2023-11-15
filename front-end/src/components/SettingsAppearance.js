import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../themes/GlobalStyles.js';
import { useTheme } from '../themes/useTheme.js';
import ThemeSelector from '../themes/themeSelector.js';

const SettingsCard = (props) => {

    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);
    useEffect(() => {
        setSelectedTheme(theme);
    }, [theme, themeLoaded]);

    return (
        themeLoaded && <ThemeProvider theme={selectedTheme}>
            <GlobalStyles />
            <Card className="settings-card">
                <Card.Title>Appearance</Card.Title>
                <Card.Text className="settings-section">Accent Color</Card.Text>
                <ThemeSelector setter={setSelectedTheme} />
            </Card>
        </ThemeProvider>
    )

}

export default SettingsCard;