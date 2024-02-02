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
    death_type_id: number;
}
export const EditDeathModal = ({ mode, button, death_type_id, death=undefined }: Props) => {
    const modalState = useModalState();
    const { deathTypes, deathTypeOptions} = useDeathTypes();
    const { addDeath, updateDeath } = useDeaths(undefined);

    const handleSubmit = (values: EditDeathValues) => {
        const action = mode === DeathEditMode.Edit ? updateDeath : addDeath;
        const newDeath: Death = {
            death_type_id: values.death_type_id,
            description: values.description,
            factors: values.factors,
            genes: values.genes,
            id: death?.id || 0
        };
        action(newDeath);
        console.log(newDeath);
        modalState.toggleModal();
    }

    return <BetterModal state={modalState}
                        minWidth={500}
                        body={<EditDeathForm death={death}
                                             handleSubmit={handleSubmit}
                                             death_type_id={death_type_id}
                                             death_types_options={deathTypeOptions}
                                             death_types={deathTypes} />}
                        title={mode === DeathEditMode.Edit ? "Edit death" : "Add death"}
                        button={button} />
}