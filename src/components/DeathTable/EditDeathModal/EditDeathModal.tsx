import React, {ReactNode} from 'react';
import {useModalState} from "../../../hooks/useModalState";
import {BetterModal} from "../../shared/BetterModal/BetterModal";
import EditDeathForm from './EditDeathForm';
import {Death} from "../../../api/models/Death";
import {EditDeathValues} from "./EditDeath.types";
import {useDeathTypes} from "../../../hooks/useDeathTypes";
import {useDeaths} from "../../../hooks/useDeaths";

export enum DeathEditMode {
    Edit,
    Add,
}

type Props = {
    mode: DeathEditMode;
    button: ReactNode;
    death?: Death;
    death_type: number;
}
export const EditDeathModal = ({ mode, button, death_type, death=undefined }: Props) => {
    const modalState = useModalState();
    const { deathTypes, deathTypeOptions, getDeathTypeById } = useDeathTypes();
    const { addDeath, updateDeath } = useDeaths(undefined);

    const handleSubmit = (values: Death) => {
        const action = mode === DeathEditMode.Edit ? updateDeath : addDeath;
        action(values);
    }

    return <BetterModal state={modalState}
                        minWidth={500}
                        body={<EditDeathForm death={death}
                                             death_type={death_type}
                                             death_types_options={deathTypeOptions}
                                             handleSubmit={handleSubmit}
                                             death_types={deathTypes} />}
                        title={mode === DeathEditMode.Edit ? "Edit death" : "Add death"}
                        button={button} />
}