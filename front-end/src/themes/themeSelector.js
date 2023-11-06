import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { useTheme } from '../themes/useTheme';
import { getFromLS } from '../utils/storage';
import Button from 'react-bootstrap/Button';

const Switch = (props) => {
    const themesFromStore = getFromLS('all-themes');
    const [data] = useState(themesFromStore.data);
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
                        backgroundColor: props.theme.accent,
                        color: `black`,
                    }}>
                    {props.theme.name}
                </Button>
            </>
        )
    }

    return (
        <>                {
            themes.length > 0 &&
            themes.map(theme => (
                <ThemeButton theme={data[theme]} key={data[theme].id} />
            ))
        }
        </>
    )
}

export default Switch;