import React ,{useContext} from "react";
import {Link, useNavigate} from "react-router-dom"  //from going from one page to another page ,page will not refresh now ,it goes directly on that page without refreshing (😇)
import { UserContext } from "../App";
const NavBar=()=>{
  const {state,dispatch} = useContext(UserContext)
  const Navigate=useNavigate()
  const renderList =()=>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li>
            <button class="btn waves-effect red "
           onClick={()=>{
              
              localStorage.clear()
              dispatch({type:"CLEAR"})
              Navigate('/login');
          }}>
              Logout
                 </button>
        </li>
      ]
    }
    else {
      return [
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
    return (
               <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"login"} className="brand-logo">ZAGUAR</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      {renderList()}
        <li><Link to="/">Signin with Google</Link></li>
      </ul>
    </div>
  </nav>

    )
}

export default NavBar;