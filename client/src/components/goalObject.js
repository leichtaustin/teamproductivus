const GoalItem = ({goal}) => {


    return (
        <li className="goalItem">
            <div className="infoContainer">
                <p className="goalName">{goal.goal_name}</p>
                <p className="target_val">{goal.target_val}</p>
                <p className="current_val">{goal.current_val}</p>
            </div>

            <div className="button-container">
                <button className="edit">EDIT</button>
                <button className="delete">DELETE</button>

            </div>
        </li>
    )
}

export default GoalItem;