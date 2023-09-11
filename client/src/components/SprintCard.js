import GoalItem from "./goalObject";

const SprintCard = ({ goals }) => {

    const goalList = goals

    return (
        <div className="sprintCard">
            <h1>Sprint Card - Goal List</h1>
            {goalList?.map((goal) => <GoalItem goal={goal}/>)}
        </div>
    )
}

export default SprintCard;