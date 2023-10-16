import { useCookies } from "react-cookie";

const PageHeader = () => {

    const [cookies, setCookie, removeCookie] = useCookies(null);

    const signOut = () => {
        removeCookie('Emai');
        removeCookie('AuthToken');
    }

    return (
        <div className="pageHeader">
            <h1>Goal Tracker</h1>
            <div className="button-container">
                <button className="signout" onClick={signOut}>
                    SIGN OUT
                </button>
            </div>

        </div>
    )
}

export default PageHeader;