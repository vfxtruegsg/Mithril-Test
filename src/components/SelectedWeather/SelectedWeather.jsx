import { useDispatch, useSelector } from "react-redux";
import {
  removeSelectWeather,
  selectSelectedWeather,
} from "../../redux/weatherSlice/weatherSlice";
import DeleteModalWindow from "../DeleteModalWindow/DeleteModalWindow";
import css from "./SelectedWeather.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

const SelectedWeather = () => {
  const dataSelectedWeather = useSelector(selectSelectedWeather);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id) => {
    dispatch(removeSelectWeather(id));
    setIsOpen(false);
    toast.success("Deleted");
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <ul className={css["selected-weather-list"]}>
        {dataSelectedWeather.length <= 0 && (
          <h4 style={{ textAlign: "center" }}>No information yet</h4>
        )}
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
            <button onClick={() => setIsOpen(true)} className={css["del-btn"]}>
              Delete
            </button>

            {isOpen && (
              <DeleteModalWindow
                handleDelete={() => handleDelete(dataSelectedWeather[index].id)}
                handleClose={handleClose}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedWeather;
