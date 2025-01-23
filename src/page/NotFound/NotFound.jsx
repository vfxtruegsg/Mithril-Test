import css from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={css.error}>
      <h1 className={css["error-msg"]}>
        Ooops, something went <span style={{ color: "red" }}>wrong...</span>{" "}
      </h1>
      <img
        className={css["weather-img"]}
        src="/src/image/free-icon-storm-1146799.png"
        alt="Cloudy weather"
      />
    </div>
  );
};

export default NotFound;
