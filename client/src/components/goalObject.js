import { useState, useEffect } from 'react';
import ModifyGoal from './ModifyGoal';

const GoalItem = ({goal, getGoals}) => {

    const [showModifyGoal, setShowModifyGoal] = useState(false);
    const [ backgroundColor, setBackgroundColor ] = useState('red');
    const [ progressPerc, setProgressPerc ] = useState((goal.current_val / goal.target_val) * 100)
    
    useEffect(() => {
        if(progressPerc < 33) {
            setBackgroundColor('red');
        } else if (progressPerc >= 33 && progressPerc < 66) {
            setBackgroundColor('yellow')
        } else {
            setBackgroundColor('green')
        }
    }, [progressPerc])


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
    //`hsla(${(goal.current_val / goal.target_val) * 100}, 100%, 50%, 1)`

    return (
        <li className="goalItem">
            <div className="infoContainer">
                <p className="goalName">{goal.goal_name}</p>
                <p className="target_val">{goal.target_val}</p>
                <p className="current_val">{goal.current_val}</p>
                <div className='progressBarContainer'>
                    <div className='progress' style={{ width: `${(goal.current_val / goal.target_val) * 100}%`, 
                        backgroundColor: `hsla(${((goal.current_val / goal.target_val) * 100) - 10}, 100%, 50%, .82)` }}>
                    </div>
                </div>
            </div>

            <div className="button-container">
                <button className="edit" onClick={() => setShowModifyGoal(true)}>EDIT</button>
                <button className="delete" onClick={deleteGoal}>DELETE</button>

            </div>
            {showModifyGoal && <ModifyGoal mode={'edit'} setShowModifyGoal={setShowModifyGoal} goal={goal} getGoals={getGoals} setProgressPerc={setProgressPerc} />}
        </li>
    )
}

export default GoalItem;