import css from "./WeatherCard.module.css";

const WeatherCard = ({ data }) => {
  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li className={css.card} key={index}>
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
