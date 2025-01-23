import { useDispatch } from "react-redux";
import css from "./Authorization.module.css";
import { logInOut } from "../../redux/userSlice/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const Authorization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    dispatch(
      logInOut({
        name: form.elements.username.value,
        password: form.elements.password.value,
        id: nanoid(),
      })
    );
    navigate("/");
    form.reset();
  };

  return (
    <div className={css.container}>
      <div className={css["title-container"]}>
        <h1>Weather</h1>
        <img
          src="/src/image/free-icon-climate-change-5545553.png"
          alt="Logo Weather"
          className={css["logo-img"]}
        />
      </div>

      <form className={css.form} onSubmit={handleLogIn}>
        <input
          className={css.fields}
          type="text"
          name="username"
          placeholder="Enter your username"
          pattern="^[a-zA-Z0-9]{3,20}$"
          required
          title="The username must contain from 3 to 20 characters and consist of letters and numbers only"
        />
        <input
          className={css.fields}
          type="password"
          name="password"
          placeholder="Enter your password"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
          required
          title="The password must be at least 6 characters and contain at least one letter and one number"
        />
        <button className={css["sub-btn"]} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Authorization;
