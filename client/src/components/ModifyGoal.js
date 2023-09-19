import { useCookies } from "react-cookie";
import { useState } from 'react';


const ModifyGoal = ( { mode, setShowModifyGoal, goal, getGoals, setProgressPerc }) => {
    
    const [cookies, setCookie, removeCookie] = useCookies(null);
    
    //const mode = 'edit';
    const editMode = mode === 'edit' ? true : false;

    const [data, setData ] = useState({
        user_email: editMode ? goal.user_email : cookies.Email,
        goal_name: editMode ? goal.goal_name : null,
        target_value: editMode ? goal.target_val : 1,
        current_value: editMode ? goal.current_val : 0,
        daily_value: editMode ? goal.daily_val : 0,
        sprint_id: 1,
        last_update: new Date().getDate()
    })

    const postGoal = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goals`, {
                method : "POST",
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (response.status === 200) {
                setShowModifyGoal(false);
                getGoals();
            }
        } catch (err) {
            console.error(err);
        }
    }

    const editGoal = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goals/${goal.id}`, {
                method: "PUT",
                headers : { 'Content-Type' : 'application/json' },
                body : JSON.stringify(data)
            })

            if (response.status === 200) {
                setShowModifyGoal(false);
                getGoals();
                setProgressPerc((data.current_value / data.target_value) * 100)
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData(data => ({
            ...data, 
            [name] : value
        }))
    }

    return (
        <div className="modifyGoalOverlay">
            <div className="modifyGoalContainer">
                <div className="formTitleContainer">
                    <h3>Let's {mode} your task</h3>
                    <button className="exitEditButton" onClick={() => setShowModifyGoal(false)}>X</button>
                </div>

                <form className="goalModifyForm">
                    <input 
                            required
                            maxLength={30}
                            placeholder="Your goal goes here"
                            name="goal_name"
                            value={data.goal_name}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="target_value">Target Value</label>
                        <input 
                            required
                            type="number"
                            id="target_value"
                            min="0"
                            max="100"
                            name="target_value"
                            value={data.target_value}
                            onChange={handleChange}
                        />
                        <label htmlFor="current_value">Current Value</label>
                        <input 
                            required
                            type="number"
                            id="current_value"
                            min="0"
                            max="100"
                            name="current_value"
                            value={data.current_value}
                            onChange={handleChange}
                        />
                        <input className={mode} type="submit" onClick={editMode ? editGoal: postGoal}/>
                </form>
            </div>
        </div>
    )
}

export default ModifyGoal;