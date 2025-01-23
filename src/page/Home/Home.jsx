import css from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectName } from "../../redux/userSlice/userSlice";
import { logInOut } from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const username = useSelector(selectName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logInOut({}));
    navigate("/authorization");
  };
  return (
    <div className={css.container}>
      <nav className={css.navigation}></nav>

      <h1 className={css.greetings}>Welcome, {username || "User"}!</h1>

      <button onClick={handleLogOut} className={css.logout}>
        Log Out
      </button>
    </div>
  );
};

export default Home;
