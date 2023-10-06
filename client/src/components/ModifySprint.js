import { useState } from 'react';

const ModifySprint = ({ mode, setShowModifySprint, getSprints }) => {

    const sprintSample =  {
        sprint_id: '1',
        sprint_name: 'firstSprint',
        sprint_start_date: '2023-09-19',
        sprint_end_date: '2023-09-30'
    }

    const [data, setData] = useState({
        sprint_name: sprintSample.sprint_name,
        sprint_start_date: sprintSample.sprint_start_date,
        sprint_end_date: sprintSample.sprint_end_date
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
                        value={data.sprint_start_date}
                        defaultValue={new Date()}
                        name='sprint_start_date'
                        onChange={handleChange}
                    />
                    <label htmlFor='sprint_end_date'>
                        Sprint End Date
                    </label>
                    <input
                        required
                        type='date'
                        id='sprint_end_date'
                        value={data.sprint_end_date}
                        min={data.sprint_start_date}
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