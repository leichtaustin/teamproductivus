
const DailyLog = ({goals, getGoals }) => {
    


    const postGoal = async (e) => {
        e.preventDefault();
        goals.map( async (goal) => {
            const newCurrentValue = Number(document.getElementById(goal.goal_name).value) + Number(goal.current_val);
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goals/${goal.id}`, {
                    method : "PUT",
                    headers : { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_email: goal.user_email,
                        goal_name: goal.goal_name,
                        target_value: goal.target_val,
                        current_value: newCurrentValue
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
                                defaultValue={0}
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