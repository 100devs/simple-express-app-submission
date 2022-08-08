import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Nav = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="text-end">
      {/* <li>
        <Link to="/update-profile" className="btn btn-primary">
          Update Profile
        </Link>
      </li> */}
      <li>
        <Link to="/profile" className="btn btn-primary">
          Profile
        </Link>
      </li>

      {/* <li>
        <Link to="/logout" className="btn btn-primary">
          Log Out
        </Link>
      </li> */}
      {/* <li>
        <Link to="/login" className="btn btn-primary">
          Log In
        </Link>
      </li> */}
      <li>{currentUser.email}</li>
    </nav>
  );
};

export default Nav;
