import { ReactComponent as IconMinus } from "../../assets/images/icon-minus.svg";
import { ReactComponent as IconPlus } from "../../assets/images/icon-plus.svg";

import "./score-button-group.styles.scss";

const ScoreButtonGroup = ({ score, scoreStatus, upvoteHandler, downvoteHandler }) => {
    return (
        <div className="score-container">
            <button className="plus-button" onClick={upvoteHandler}><IconPlus /></button>
            <span className={`score-span ${scoreStatus}`}>{score}</span>
            <button className="minus-button" onClick={downvoteHandler}><IconMinus /></button>
        </div>
    );
};

export { ScoreButtonGroup };