import SprintItem from "./SprintItem";

const SprintList = ( { sprints, getSprints }) => {
    
    
    const sprintList = sprints;
    
    return (
        <div className="sprintListContainer">
            <h3>Upcoming Sprints</h3>
            <div className="sprintList">
                {sprintList?.map((sprint) => <SprintItem sprint={sprint} getSprints = {getSprints} />)}
            </div>

        </div>
    )
}

export default SprintList;