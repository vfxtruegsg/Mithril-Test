import css from "./WeatherCard.module.css";
import { FaStar } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedWeather,
  selectWeather,
} from "../../redux/weatherSlice/weatherSlice";
import toast from "react-hot-toast";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend
);

const WeatherCard = ({ data, dataHourlyWeather }) => {
  const dispatch = useDispatch();
  const selectBtn = document.getElementById("select-icon");

  const dataSelectedWeather = useSelector(selectSelectedWeather);

  const handleSelectWeather = (data) => {
    // console.log(data);
    // console.log(dataSelectedWeather);

    // const isAlreadyAdded =
    //   dataSelectedWeather.length > 0 &&
    //   data.some((item, index) => item[0].id === dataSelectedWeather[index]?.id);

    // console.log(isAlreadyAdded);

    // if (isAlreadyAdded) {
    //   toast.error("Already in selected");
    //   return;
    // }

    dispatch(selectWeather(...data));

    toast.success("Added to saved queries");
  };

  const labels = dataHourlyWeather.map((item, index) =>
    item.list[index].dt_txt.slice(11, 16)
  );
  const temperatures = dataHourlyWeather.map(
    (item, index) => item.list[index].main.temp
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => `Temperature: ${context.raw.toFixed(1)}°C`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: {
        title: { display: true, text: "Temperature (°C)" },
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li className={css.card} key={index}>
            <button
              id="select-icon"
              className={css["select-btn"]}
              onClick={() => handleSelectWeather(data)}
            >
              <FaStar className={css["select-btn-icon"]} />
            </button>
            <div className={css["temp-inf"]}>
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
            </div>

            <div>
              <h4 style={{ textAlign: "center" }}>Hourly forecast:</h4>
              <Line data={chartData} options={chartOptions} />
            </div>

            <div>
              <iframe
                width="300"
                height="300"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  item?.coord?.lon - 0.01
                },${item?.coord?.lat - 0.01},${item?.coord?.lon + 0.01},${
                  item?.coord?.lat + 0.01
                }&layer=mapnik&marker=${item?.coord?.lat},${item?.coord?.lon}`}
                style={{ border: "1px solid black" }}
              ></iframe>
              <br />
              <small>
                <a
                  style={{ textDecoration: "underline" }}
                  href={`https://www.openstreetmap.org/?mlat=${item?.coord?.lat}&amp;mlon=${item?.coord?.lon}#map=16/${item?.coord?.lat}/${item?.coord?.lon}&amp;layers=N`}
                  target="blank"
                >
                  View larger map
                </a>
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherCard;
