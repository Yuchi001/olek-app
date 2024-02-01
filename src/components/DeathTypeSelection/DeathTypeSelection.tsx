import React from 'react';
import {Stack} from "@mui/joy";
import {useDeathTypes} from "../../hooks/useDeathTypes";
import {AddDeathTypeModal} from "./AddDeathTypeModal/AddDeathTypeModal";
import {BetterSelect} from "../shared/BetterSelect/BetterSelect";
import {isString} from "formik";

type Props = {
    setPickedDeathType: (id: number) => void;
    pickedDeathType: number | undefined;
}
export const DeathTypeSelection = ({ pickedDeathType, setPickedDeathType }: Props) => {
    const { deathTypeOptions, addDeathType } = useDeathTypes();

    return (
        <Stack direction="row" spacing={1} alignItems="stretch" width="100%">
            <BetterSelect options={deathTypeOptions}
                          placeHolder={"Select death type..."}
                          value={pickedDeathType || null}
                          onChange={(value) => {
                              setPickedDeathType(+value);}} />
            <AddDeathTypeModal addDeathType={addDeathType} />
        </Stack>
    );
}