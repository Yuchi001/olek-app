import React from 'react';
import {useModalState} from "../../../hooks/useModalState";
import {BetterModal} from "../../shared/BetterModal/BetterModal";
import {AddOutlined} from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import AddDeathTypeForm from "./AddDeathTypeForm";
import {DeathTypeValues} from "./AddDeathType.types";
import {DeathType} from "../../../api/models/DeathType";

type Props = {
    addDeathType: (deathType: DeathType) => void,
}
export const AddDeathTypeModal = ({ addDeathType }: Props) => {
    const modalState = useModalState();

    const handleSubmit = (values: DeathTypeValues) => {
        addDeathType({ id: 0, name: values.name });
        modalState.toggleModal();
    }

    return <BetterModal state={modalState}
                        title={"Add death type"}
                        body={<AddDeathTypeForm handleSubmit={handleSubmit} />}
                        minWidth={400}
                        button={<IconButton variant="solid" color="primary"><AddOutlined /> </IconButton>} />
}