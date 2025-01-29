import { useDispatch, useSelector } from "react-redux";
import {
  removeSelectWeather,
  selectSelectedWeather,
} from "../../redux/weatherSlice/weatherSlice";
import css from "./SelectedWeather.module.css";

const SelectedWeather = () => {
  const dataSelectedWeather = useSelector(selectSelectedWeather);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(removeSelectWeather(id));
  };
  return (
    <div>
      <ul className={css["selected-weather-list"]}>
        {dataSelectedWeather.map((item, index) => (
          <li className={css["selected-weather-container"]} key={index}>
            <h3>
              City: {item.name} | Country: {item.sys.country}
            </h3>
            <p>
              Weather condition:{" "}
              {item?.weather?.[0]?.main || "No weather information"}
            </p>
            <p>
              Current temperature {(item.main.temp - 273).toFixed(1)} &deg;C
            </p>
            <p>
              Max temperature {(item.main.temp_max - 273).toFixed(1)} &deg;C
            </p>
            <p>
              Min temperature {(item.main.temp_min - 273).toFixed(1)} &deg;C
            </p>
            <button
              onClick={() => handleDelete(dataSelectedWeather[index].id)}
              className={css["del-btn"]}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedWeather;
