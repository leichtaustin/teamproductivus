const SprintItem = ({ sprint, getSprints, setActiveSprint, getGoals }) => {

    const deleteSprint = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/sprints/${sprint.id}`, {
                method: "DELETE"
            });
            if (response.status === 200) {
                getSprints();
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleSetActive = () => {
        setActiveSprint(sprint);
        getGoals();
    }

    return (
        <li className="sprintItem">
            <div className="infoContainer">
                <p className="sprintName">{sprint.sprint_name}</p>
                <p className="sprintStartDate">Start Date: {sprint.sprint_start_date.split('T')[0]}</p>
                <p className="sprintEndDate">End Date: {sprint.sprint_end_date.split('T')[0]}</p>
                <div className="button-container">
                    <button className="create" onClick={deleteSprint}>DELETE</button>
                </div>
                <div className="button-container">
                    <button className="create" onClick={handleSetActive}>VIEW DETAILS</button>
                </div>


            </div>

        </li>
    )
}

export default SprintItem;