import PageHeader from "./components/PageHeader";
import SprintCard from "./components/SprintCard";
import Auth from "./components/Auth";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

const App = () => {
  
  const [ goals, setGoals ] = useState(null);
  const [ cookies, setCookie, removeCookie ] = useCookies(null);
  const authToken = cookies.AuthToken;
  const user_email = cookies.Email;
  
  
  //get goal list from db
  const getGoals = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goals/${user_email}`);
      const json = await response.json();

      setGoals(json);
      console.log('Goals should be set')
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getGoals();
  }, []);
  
  return (
    <div className="App">
      <PageHeader />
      {!authToken && <Auth />}
      {authToken &&
        <>
          <SprintCard goals={goals}/>
        </>
      }

    </div>
  );
}

export default App;