import React, {useState} from 'react';
import {Stack} from "@mui/joy";
import {DeathTypeSelection} from "../DeathTypeSelection/DeathTypeSelection";
import {DeathTable} from "../DeathTable/DeathTable";

export const MainPage = () => {
    const [pickedDeathType, setPickedDeathType] = useState<number | undefined>(undefined);

    return <Stack alignItems="center" style={{ width: '100%', marginTop: 70 }}>
        <Stack spacing={1} alignItems="center" style={{ width: '70%' }}>
            <DeathTypeSelection setPickedDeathType={setPickedDeathType}
                                pickedDeathType={pickedDeathType} />
            {pickedDeathType && (<DeathTable pickedDeathType={pickedDeathType} />)}
        </Stack>
    </Stack>
}