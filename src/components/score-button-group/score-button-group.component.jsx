import { ReactComponent as IconMinus } from "../../assets/images/icon-minus.svg";
import { ReactComponent as IconPlus } from "../../assets/images/icon-plus.svg";

import "./score-button-group.styles.scss";

const ScoreButtonGroup = ({ score }) => {
    return (
        <div className="score-container">
            <button className="plus-button"><IconPlus /></button>
            <span className="score-span">{score}</span>
            <button className="minus-button"><IconMinus /></button>
        </div>
    );
};

export { ScoreButtonGroup };