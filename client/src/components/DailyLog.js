const DailyLog = ({goals}) => {
    

    return (
        <div className="dailyLogContainer">
            <h3>Daily Log</h3>
            <form className="logForm">
                {goals.map((goal) => {
                    return(
                        <div className="goalLogItem">
                            <label htmlFor="goalInput">{goal.goal_name}</label>
                            <input 
                                type="number" 
                                id="goalInput"
                                value={goal.current_val}/>
                        </div>
                    )
                })}
                <div className="submitButtonContainer">
                    <input className='updateLog' type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default DailyLog;