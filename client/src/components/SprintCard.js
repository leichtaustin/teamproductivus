import GoalItem from "./goalObject";
import ModifyGoal from "./ModifyGoal";
import { useState } from "react";

const SprintCard = ({ goals, getGoals, activeSprint }) => {

    const goalList = goals
    const [showModifyGoal, setShowModifyGoal] = useState(false);

    return (
        <div className="sprintCard">
            <h1>Sprint Name:  {activeSprint && activeSprint.sprint_name}</h1>
            <div className="button-container">
                <button className="create" onClick = {() => setShowModifyGoal(true)}>ADD GOAL</button>
            </div>
            {goalList?.map((goal) => <GoalItem goal={goal} getGoals={getGoals}/>)}
            {showModifyGoal && <ModifyGoal mode={'create'} setShowModifyGoal={setShowModifyGoal} getGoals = {getGoals} activeSprint = {activeSprint}/>}
        </div>
    )
}

export default SprintCard;