import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { useTheme } from '../themes/useTheme';
import { getFromLS } from '../utils/storage';
import Button from 'react-bootstrap/Button';

const Switch = (props) => {
    const themesFromStore = getFromLS('all-themes');
    let accentColors = "";
    if (themesFromStore !== undefined) {
        accentColors = themesFromStore['data'];
    }
    const [data] = useState(accentColors);
    const [themes, setThemes] = useState([]);
    const { setMode } = useTheme();

    const themeSwitcher = selectedTheme => {
        console.log(selectedTheme);
        setMode(selectedTheme);
        props.setter(selectedTheme);
    };

    useEffect(() => {
        setThemes(_.keys(data));
    }, [data]);


    const ThemeButton = props => {
        return (
            <>
                <Button onClick={(theme) => themeSwitcher(props.theme)}
                    style={{
                        backgroundColor: props.theme.colors.accent,
                        borderColor: props.theme.colors.accent,
                    }}>
                </Button>
            </>
        )
    }

    return (
        <div className="theme-container">
            {
                themes.length > 0 &&
                themes.map(theme => (
                    <ThemeButton theme={data[theme]} key={data[theme].id} />
                ))
            }
        </div>
    )
}

export default Switch;