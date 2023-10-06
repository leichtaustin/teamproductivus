
const DailyLog = ({goals, getGoals, activeSprint }) => {

    const currentDate = new Date().getDate();
    

    const postGoal = async (e) => {
        e.preventDefault();
        const date = new Date();
        goals.map( async (goal) => {
            const newCurrentValue = (
                (goal.daily_val === Number(document.getElementById(goal.goal_name).value) 
                ? Number(goal.current_val) 
                : ((goal.daily_val > Number(document.getElementById(goal.goal_name).value)) 
                    ? Number(goal.current_val) - (goal.daily_val - Number(document.getElementById(goal.goal_name).value))
                    : (Number(document.getElementById(goal.goal_name).value) - goal.daily_val) + Number(goal.current_val)))
            )
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goals/${goal.id}`, {
                    method : "PUT",
                    headers : { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_email: goal.user_email,
                        goal_name: goal.goal_name,
                        target_value: goal.target_val,
                        current_value: newCurrentValue,
                        daily_value: Number(document.getElementById(goal.goal_name).value),
                        sprint_id: activeSprint.id,
                        last_update: date.getDate()
                    })
                })
    
                if (response.status === 200) {
                    getGoals();
                }
            } catch (err) {
                console.error(err);
            }
        })
        
    }

    return (
        <div className="dailyLogContainer">
            <h3>Daily Log</h3>
            <form className="logForm" id="dailyLogForm" onSubmit={postGoal}>
                {goals.map((goal) => {
                    return(
                        <div className="goalLogItem">
                            <label htmlFor="goalInput">{goal.goal_name}</label>
                            <input 
                                type="number" 
                                id={goal.goal_name} 
                                defaultValue={(goal.last_update < currentDate) ? 0 : (goal.daily_val ? goal.daily_val : 0)}
                                min={0}
                                />
                        </div>
                    )
                })}
                <div className="submitButtonContainer">
                    <input className='updateLog' type="submit" />
                </div>
            </form>
        </div>
    )
}

export default DailyLog;