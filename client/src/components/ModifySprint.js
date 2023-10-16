import { useState } from 'react';
import { useCookies } from "react-cookie";

const ModifySprint = ({ mode, setShowModifySprint, getSprints }) => {

    const date = new Date();
    const todaysDate = new Date(date).toISOString().split('T')[0];
    const [cookies, setCookie, removeCookie] = useCookies(null);

    const [data, setData] = useState({
        sprint_name: `Sprint starting ${todaysDate}`,
        sprint_start_date: todaysDate,
        sprint_end_date: null,
        user_email: cookies.Email,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData(data => ({
            ...data,
            [name] : value
        }))
    };

    const postSprint = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/sprints`, {
                method: "POST",
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (response.status === 200) {
                setShowModifySprint(false);
                getSprints();
                console.log('Sprint Added');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="modifySprintOverlay">
            <div className="modifySprintContainer">
                <div className="sprintFormContainer">
                    <h3>{mode} Sprint</h3>
                    <button className="exitEditButton" onClick={() => setShowModifySprint(false)}>
                        X
                    </button>
                </div>

                <form className="sprintModifyForm">
                    <input 
                        required
                        maxLength={255}
                        placeholder="Sprint_Name"
                        name="sprint_name"
                        value={data.sprint_name}
                        onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor='sprint_start_date'>
                        Sprint Start Date
                    </label>
                    <input
                        required
                        type='date'
                        id='sprint_start_date'
                        defaultValue={todaysDate}
                        name='sprint_start_date'
                        onChange={handleChange}
                        min={todaysDate}
                    />
                    <label htmlFor='sprint_end_date'>
                        Sprint End Date
                    </label>
                    <input
                        required
                        type='date'
                        id='sprint_end_date'
                        min={todaysDate}
                        name='sprint_end_date'
                        onChange={handleChange}
                    />
                    <br/>
                    <input type='submit' className='submitSprint' onClick={postSprint}/>
                </form>
            </div>

        </div>
    )
}

export default ModifySprint;