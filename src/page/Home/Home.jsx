import css from "./Home.module.css";
import errStyle from "../../Index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectName } from "../../redux/userSlice/userSlice";
import { logInOut } from "../../redux/userSlice/userSlice";
import WeatherSearch from "../../components/WeatherSearch/WeatherSearch";
import {
  selectData,
  selectisError,
  selectIsLoading,
} from "../../redux/weatherSlice/weatherSlice";
import { TailSpin } from "react-loader-spinner";
import WeatherCard from "../../components/WeatherCard/WeatherCard";

const Home = ({ setIsAuth }) => {
  const username = useSelector(selectName);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectisError);
  const data = useSelector(selectData);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logInOut({}));
    setIsAuth(false);
    localStorage.removeItem("isAuthenticated");
  };
  return (
    <div className={css.container}>
      <div className={css.logo}>
        <h1>Weather App</h1>
        <img
          src="../../image/free-icon-climate-change-5545553.png"
          alt="Weather Logo"
          width="64"
          height="64"
        />
      </div>
      <nav className={css.navigation}></nav>

      <h2 className={css.greetings}>Welcome, {username || "User"}!</h2>

      <WeatherSearch />

      {isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <TailSpin color="#60bfff" height="100" width="100" />
        </div>
      )}
      {isError && (
        <div className={errStyle["error-container"]}>
          <h2 style={{ textAlign: "center" }}>
            Something went wrong... Please, try again later!
          </h2>
          <img src="../../image/error.png" alt="Error image" />
        </div>
      )}

      {data && <WeatherCard data={data} />}

      <button onClick={handleLogOut} className={css.logout}>
        Log Out
      </button>
    </div>
  );
};

export default Home;
