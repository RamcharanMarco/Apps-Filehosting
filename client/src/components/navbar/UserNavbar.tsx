import { Link } from "react-router-dom";
import "../../styles/userNavbar.scss";
import { useStore } from "../../store/store";
import { useLogout } from "../../hooks/useLogout";

const UserNavbar = () => {
  const { user } = useStore();
  const { logout } = useLogout();

  return (
    <nav className="userNavbar">
      <h1>file-hosting</h1>
      <div className="links">
        <Link to={`/console/${user.user._id}/buckets`}>buckets</Link>
        <Link to={`/console/${user.user._id}/settings`}>settings</Link>
      </div>
    </nav>
  );
};

export default UserNavbar;
