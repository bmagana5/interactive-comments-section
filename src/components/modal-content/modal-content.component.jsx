import { useContext } from "react";
import { DataContext } from "../../contexts/data.context";

import "./modal-content.styles.scss";

const ModalContent = () => {
    const { declineDelete, confirmDelete } = useContext(DataContext);

    return (
        <div className="modal-content-container">
            <h2>Delete comment</h2>
            <p className="modal-paragraph">
                Are you sure you want to delete this comment? 
                This will remove the comment and can't be undone.
            </p>
            <div className="modal-buttons-container">
                <button className="decline-delete" onClick={declineDelete}>NO, CANCEL</button>
                <button className="confirm-delete" onClick={confirmDelete}> YES, DELETE</button>
            </div>
        </div>
    );
};

export { ModalContent };