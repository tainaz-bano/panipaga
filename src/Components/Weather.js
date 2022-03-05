import React, { useEffect, useState } from "react";
import Days from "./Days";
import Spinner from "./Spinner";

function Weather() {
  let lat;
  let lon;

  const [day, setDay] = useState("");
  const [humanDateFormat, setHumanDateFormat] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState({});
  const [weatherDay, setWeatherDay] = useState("");
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
  });
  const updateWeather = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=6473e87988f56c3fb35bb4ce2836449a`;
    let data = await fetch(url);
    let parseddata = await data.json();
    setParsedData(parseddata);
      const unixTimestamp = parseddata?.current?.dt;
      const milliseconds = unixTimestamp * 1000; // 1575909015000
      const dateObject = new Date(milliseconds);
      setHumanDateFormat(dateObject?.toLocaleString()); //2019-12-9 10:30:15
      setDay(dateObject.toLocaleString("en-US", { weekday: "long" }));
      let weather = parseddata?.current?.weather?.map((a) => a.main);
      setWeatherDay(weather);
    setLoading(false);
    console.log(parseddata);
  };
  useEffect(() => {
    console.log("useeffect ran");
    updateWeather();
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      <section className="vh-100" style={{ backgroundColor: "#cdc4f9" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-8">
              <div
                className="card shadow-0 border border-dark border-5 text-dark"
                style={{ borderRadius: 10 + "px" }}
              >
                <div
                  className="col-xl-8 text-center  border-5 border-dark py-4 px-5"
                  style={{
                    marginTop: -1.5 + "rem",
                    marginBottom: -1.5 + "rem",
                  }}
                >
                  <div className="d-flex justify-content-around mt-3">
                    <p className="small">{humanDateFormat}</p>
                    {/* <p className="small">Rain map</p> */}
                  </div>
                  <div className="d-flex justify-content-around align-items-center py-5 my-4">
                    <p className="fw-bold mb-0" style={{ fontSize: 4 + "rem" }}>
                      {Math.ceil(parsedData?.current?.temp).toString()}℃
                    </p>
                    <div className="text-start mx-5">
                      {/* <p className="small">10:00</p> */}
                      <p className="h3 mb-3">{day}</p>
                      <p className="small mb-0">{weatherDay}</p>
                    </div>
                  </div>
                  <div className="days align-items-center mb-3">
                    <div className="flex-column">
                      <i className="fas fa-minus"></i>
                    </div>
                    {parsedData?.daily?.map((e, index) => {
                      return (
                        <Days
                          day={day}
                          temp={Math.ceil(e.feels_like?.day).toString()}
                          key={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Weather;
