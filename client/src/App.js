import PageHeader from "./components/PageHeader";
import SprintCard from "./components/SprintCard";
import ModifySprint from "./components/ModifySprint";
import SprintList from "./components/SprintList";
import Auth from "./components/Auth";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import DailyLog from "./components/DailyLog";

const App = () => {
  
  const [ goals, setGoals ] = useState(null);
  const [ sprints, setSprints ] = useState(null);
  const [ activeSprint, setActiveSprint ] = useState(null);
  const [ pastSprints, setPastSprints ] = useState(null);
  const [ cookies, setCookie, removeCookie ] = useCookies(null);
  const [ showModifySprint, setShowModifySprint ] = useState(false);
  const authToken = cookies.AuthToken;
  const user_email = cookies.Email;
  
  
  //get goal list from db
  const getGoals = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goals/${user_email}/${activeSprint.id}`);
      const json = await response.json();

      //sort array
      json.sort((a, b) => {
        const goalA = a.goal_name.toUpperCase();
        const goalB = b.goal_name.toUpperCase();

        if (goalA < goalB) {
          return -1;
        }
        if (goalA > goalB) {
          return 1;
        }

        return 0;
      })

      setGoals(json);

      //console.log('Goals should be set')
    } catch (err) {
      console.error(err);
    }
  }

    //get sprints from db
    const getSprints = async () => {

      
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/sprints`);
        const json = await response.json();
  
        setSprints(json);
        console.log(json);
        setActiveSprint(json[0])
  
      } catch (err) {
        console.error(err);
      }
    }

  useEffect(() => {
    if(authToken) {
      getSprints();
      getGoals();
    }
  }, []);

  useEffect(() => {
    getGoals();
  }, [activeSprint])


  
  return (
    <div className="App">
      <div className="daily_goals">
        <div className="sprintSection">
          <PageHeader />
          {!authToken && <Auth />}
          {authToken &&
            <>
              <div className="button-container">
                <button className="create" onClick={() => setShowModifySprint(true)}>Create Sprint</button>
              </div>
              <SprintCard goals={goals} getGoals = {getGoals} activeSprint = {activeSprint}/>
            </>
          }
        </div>
        {/* <div className="dailyLogSection">
          {goals && <DailyLog goals = {goals} getGoals = {getGoals} activeSprint = {activeSprint}/>}
        </div> */}
      </div>

      <div className="upcomingSprints">
          {sprints && <SprintList sprints = {sprints} getSprints = {getSprints} setActiveSprint = {setActiveSprint} getGoals={getGoals}/>}
      </div>


      <div className="ModifySprintOverlay">
        {showModifySprint && <ModifySprint mode = {'Create'} setShowModifySprint = {setShowModifySprint} getSprints = {getSprints}/>}
      </div>

     

    </div>
  );
}

export default App;
