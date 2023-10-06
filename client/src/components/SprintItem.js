const SprintItem = ({ sprint, getSprints, setActiveSprint, getGoals }) => {

    const day = sprint.sprint_start_date;

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
                <p className="sprintStartDate">{day}</p>
                <p className="sprintEndDate">{sprint.sprint_end_date}</p>
                <button onClick={deleteSprint}>DELETE</button>
                <button onClick={handleSetActive}>SET ACTIVE</button>
            </div>

        </li>
    )
}

export default SprintItem;