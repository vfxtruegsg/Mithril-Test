import css from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectName } from "../../redux/userSlice/userSlice";
import { logInOut } from "../../redux/userSlice/userSlice";
import { NavLink } from "react-router-dom";
const Home = () => {
  const username = useSelector(selectName);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logInOut({}));
  };
  return (
    <div className={css.container}>
      <nav className={css.navigation}></nav>

      <h1 className={css.greetings}>Welcome, {username || "User"}!</h1>
      <NavLink onClick={handleLogOut} to="/" className={css.logout}>
        Log Out
      </NavLink>
    </div>
  );
};

export default Home;
