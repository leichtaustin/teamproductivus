import SprintItem from "./SprintItem";

const SprintList = ( { sprints, getSprints, setActiveSprint, getGoals }) => {
    
    
    //const sprintList = sprints;
    const upcomingSprints = sprints.filter(function(sprint) {
        if (sprint.sprint_start_date >= this.date && this.count < 3) {
            this.count++;
            return sprint;
        } else {
            return false;
        }
    }, {count: 0, date: new Date().toISOString().split('T')[0]})

    const pastSprints = sprints.filter(function(sprint) {
        if (sprint.sprint_start_date < this.date && this.count < 3) {
            this.count++;
            return sprint;
        } else {
            return false;
        }
    }, {count: 0, date: new Date().toISOString().split('T')[0]});
    
    return (
        <div className="sprintListContainer">
            <h3>Upcoming Sprints</h3>
            <div className="sprintList">
                {upcomingSprints?.map((sprint) => <SprintItem sprint={sprint} getSprints = {getSprints} setActiveSprint = {setActiveSprint} getGoals = {getGoals}/>)}
            </div>

            <h3>Past Sprints</h3>
            <div className="sprintList">
                {pastSprints?.map((sprint) => <SprintItem sprint={sprint} getSprints = {getSprints} setActiveSprint = {setActiveSprint} getGoals = {getGoals}/>)}
            </div>

        </div>
    )
}

export default SprintList;