import React, {ReactNode} from 'react';
import {BetterModal} from "../../shared/BetterModal/BetterModal";
import {useModalState} from "../../../hooks/useModalState";
import {Button, Stack, Typography} from "@mui/joy";
import {WarningOutlined} from "@mui/icons-material";

type Props = {
    button: ReactNode;
    removeDeath: () => void;
}
export const DeleteDeathModal = ({ button, removeDeath }: Props) => {
    const modalState = useModalState();

    const handleRemove = () => {
        removeDeath();
        modalState.toggleModal();
    }

    const body: ReactNode = <>You are about to delete death from the database, this action cannot be undone, are you sure?</>

    const actions: ReactNode = <Stack direction="row" spacing={1} style={{ width: '100%' }}>
        <Button fullWidth color="danger" onClick={handleRemove}>Yes, delete</Button>
        <Button fullWidth onClick={modalState.toggleModal}>Cancel</Button>
    </Stack>

    return <BetterModal state={modalState}
                        minWidth={300}
                        button={button}
                        body={body}
                        actions={actions}
                        title={<Typography startDecorator={<WarningOutlined />}>Warning!</Typography>} />
}