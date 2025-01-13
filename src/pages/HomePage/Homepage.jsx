import { Link } from "react-router-dom"
import "../../styles/HomePage.css"



const Homepage = () => {
  return (
    <div className="nav-bar">
      <Link to={"/signUp"}>Sign up</Link>
      <Link to={"/signIn"}>Sign In</Link> | <Link to="/forgotPassword">Forgot Password</Link>
    </div>
  );
}

export default Homepage