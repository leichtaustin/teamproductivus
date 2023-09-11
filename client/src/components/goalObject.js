import { useState } from 'react';
import ModifyGoal from './ModifyGoal';

const GoalItem = ({goal, getGoals}) => {

    const [showModifyGoal, setShowModifyGoal] = useState(false);

    const deleteGoal = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goals/${goal.id}`, {
                method: "DELETE"
            });
            if (response.status === 200) {
                getGoals();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <li className="goalItem">
            <div className="infoContainer">
                <p className="goalName">{goal.goal_name}</p>
                <p className="target_val">{goal.target_val}</p>
                <p className="current_val">{goal.current_val}</p>
            </div>

            <div className="button-container">
                <button className="edit" onClick={() => setShowModifyGoal(true)}>EDIT</button>
                <button className="delete" onClick={deleteGoal}>DELETE</button>

            </div>
            {showModifyGoal && <ModifyGoal mode={'edit'} setShowModifyGoal={setShowModifyGoal} goal={goal} getGoals={getGoals}/>}
        </li>
    )
}

export default GoalItem;