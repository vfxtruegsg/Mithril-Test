import css from "./WeatherSearch.module.css";
import { useDispatch } from "react-redux";
import { getTodayWeather } from "../../redux/weatherSlice/weatherOperations";

const WeatherSearch = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const cityName = form.elements.city.value;
    dispatch(getTodayWeather(cityName));
    form.reset();
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSearch}>
        <input
          className={css.fields}
          id="city"
          type="text"
          name="city"
          placeholder="Enter city to search weather..."
        />

        <button className={css["sub-btn"]} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default WeatherSearch;
