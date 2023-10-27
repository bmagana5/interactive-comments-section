import { ModalContent } from "../modal-content/modal-content.component";

import "./modal.styles.scss";

const Modal = () => {
    return (
        <div className="modal-container">
            <ModalContent/>
        </div>
    );
};

export { Modal };