import * as React from 'react';
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ColorSchemeToggle({ onClick, sx, ...props }: IconButtonProps) {
    const { mode, setMode } = useJoyColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <IconButton size="sm" variant="outlined" color="neutral" {...props} sx={sx} disabled />;
    }
    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="outlined"
            color="neutral"
            {...props}
            onClick={() => {
                setMode(mode === 'dark' ? 'light' : 'dark');
            }}
            sx={[
                {
                    '& > *:first-of-type': {
                        display: mode === 'dark' ? 'none' : 'initial',
                    },
                    '& > *:last-of-type': {
                        display: mode === 'light' ? 'none' : 'initial',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <DarkModeRoundedIcon />
            <LightModeIcon />
        </IconButton>
    );
}
