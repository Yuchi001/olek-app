import React from 'react';
import {Button, Stack, Typography, Sheet} from "@mui/joy";
import ColorSchemeToggle from "../ColorSchemeToggle/ColorSchemeToggle";

export const TopBar = () => {
    return <Sheet
        variant="plain"
        style={{
            width: '100%',
            height: '60px',
            position: 'fixed',
            top: 0,
            zIndex: 10,
            left: 0,
            background: 'var(--joy-palette-background-level1)',
        }}
        sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
        }}
    >
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            style={{ height: '100%', marginLeft: '20px', marginRight: '20px' }}
        >
            <Typography level="h2">Bio app</Typography>
            <ColorSchemeToggle />
        </Stack>
    </Sheet>
}