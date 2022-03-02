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
  const [temp, setTemp] = useState('')
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
    
    if(parseddata?.current?.dt){
      const unixTimestamp = parseddata?.current?.dt;
      const milliseconds = unixTimestamp * 1000; // 1575909015000
      const dateObject = new Date(milliseconds);
      setHumanDateFormat(dateObject?.toLocaleString()); //2019-12-9 10:30:15
      setDay(dateObject.toLocaleString("en-US", { weekday: "long" }));
      let weather = parseddata?.current?.weather?.map((a) => a.main);
      setWeatherDay(weather);
    }else if(parseddata?.daily?.dt){
      const unixTimestamp = parseddata?.daily?.dt;
      const milliseconds = unixTimestamp * 1000; // 1575909015000
      const dateObject = new Date(milliseconds);
      setHumanDateFormat(dateObject?.toLocaleString()); //2019-12-9 10:30:15
      setDay(dateObject.toLocaleString("en-US", { weekday: "long" }));
      // let weather = parseddata?.daily?.weather?.map((a) => a.main);
      // setWeatherDay(weather);
    }
    // console.log(weather);
    setLoading(false);
    console.log(parseddata);
  };
  useEffect(() => {
    console.log("useeffect ran");
    updateWeather();
  }, []);

  // const convertdt =  async () =>{

  // }
  // convertdt();
  // console.log(props.lat)
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
                  <div className="d-flex justify-content-around align-items-center mb-3">
                    <div className="flex-column">
                      <i className="fas fa-minus"></i>
                    </div>
                    {/* {article.map((element, index) => {
                return <div className="col-md-4 my-3" key={index}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} img={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/img/2022/02/11/1600x900/nirmala_sitharaman_1644562242946_1644562250427.JPG"} newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"} date={element.publishedAt} />
                </div>
              })} */}
                {parsedData?.daily?.map((e)=>{
                    <Days day={day} temp={Math.ceil(parsedData?.daily?.temp).toString()}/>
                })}
                     {/* <div
                      className="flex-column border"
                      style={{ borderRadius: 10 + "px", padding: 0.75 + "rem" }}
                    >
                      <p className="small mb-1">Tue</p>
                      <p className="small mb-0">
                        <strong>-4°C</strong>
                      </p>
                    </div>
                    <div
                      className="flex-column border"
                      style={{ borderRadius: 10 + "px", padding: 0.75 + "rem" }}
                    >
                      <p className="small mb-1">Wed</p>
                      <p className="small mb-0">
                        <strong>-4°C</strong>
                      </p>
                    </div>
                    <div
                      className="flex-column border"
                      style={{ borderRadius: 10 + "px", padding: 0.75 + "rem" }}
                    >
                      <p className="small mb-1">Thu</p>
                      <p className="small mb-0">
                        <strong>-4°C</strong>
                      </p>
                    </div>
                    <div
                      className="flex-column border"
                      style={{ borderRadius: 10 + "px", padding: 0.75 + "rem" }}
                    >
                      <p className="small mb-1">Fri</p>
                      <p className="small mb-0">
                        <strong>-4°C</strong>
                      </p>
                    </div>
                    <div
                      className="flex-column border"
                      style={{ borderRadius: 10 + "px", padding: 0.75 + "rem" }}
                    >
                      <p className="small mb-1">Sat</p>
                      <p className="small mb-0">
                        <strong>-4°C</strong>
                      </p>
                    </div> */}
                    {/* <div className="flex-column">
                          <i className="fas fa-minus"></i>
                        </div> */}
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
