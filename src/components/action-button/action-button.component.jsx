import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/images/icon-edit.svg";
import { ReactComponent as IconReply } from "../../assets/images/icon-reply.svg";

import "./action-button.styles.scss";

const ActionButton = ({ type, action }) => {
    return (
        <button className={`${type}-button`} onClick={action}>
            {
                type === 'delete' ?
                    <IconDelete/>
                    : type === 'edit' ? 
                        <IconEdit/> 
                        : type === 'reply' ? 
                            <IconReply/> 
                            : null
            }
            { 
                type === 'delete' ? 
                    'Delete' 
                    : type === 'edit' ? 
                        'Edit' 
                        : type === 'reply' ? 
                            'Reply' 
                            : 'Cancel'
            }
        </button>
    );
};

export { ActionButton };