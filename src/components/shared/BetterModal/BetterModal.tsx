import {DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalClose, ModalDialog} from "@mui/joy";
import React, { FC, ReactNode } from "react";
import "../../shared/styles/hideScroll.css";

export interface ModalState {
    toggleModal: () => void;
    isOpen: boolean;
}

interface Props {
    state: ModalState;
    body?: ReactNode | string;
    button?: ReactNode;
    title: ReactNode | string;
    actions?: ReactNode;
    maxWidth?: number;
    minWidth?: number;
    className?: string;
    style?: React.CSSProperties;
    layout?: ModalLayout;
}
type ModalLayout = 'center' | 'fullscreen' | undefined;
export const BetterModal: FC<Props> = ({
                                           body,
                                           button,
                                           state,
                                           className,
                                           title,
                                           maxWidth = 500,
                                           minWidth = 200,
                                           actions,
                                           layout = 'center',
                                       }: Props) => {
    return (
        <div className={className} style={{ position: button === undefined ? 'absolute' : 'relative' }}>
            {button && <div onClick={state.toggleModal}>{button}</div>}
            <Modal
                onClose={state.toggleModal}
                open={state.isOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog layout={layout} variant="outlined" minWidth={minWidth} maxWidth={maxWidth}>
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <DialogTitle level="h3" style={{ marginRight: 15 }}>
                        {title}
                    </DialogTitle>
                    <Divider />
                    {body && <DialogContent className="hideScroll">{body}</DialogContent>}
                    {actions && <DialogActions>{actions}</DialogActions>}
                </ModalDialog>
            </Modal>
        </div>
    );
};
