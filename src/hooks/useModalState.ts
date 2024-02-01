import {useState} from "react";
import {ModalState} from "../components/shared/BetterModal/BetterModal";

interface ModalActions {
    actionOnClose?: () => void;
}

export const useModalState = (actions?: ModalActions): ModalState => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        if (isOpen && actions && actions.actionOnClose) {
            actions.actionOnClose();
        }
        setIsOpen(!isOpen);
    };

    return {
        isOpen,
        toggleModal,
    };
};
