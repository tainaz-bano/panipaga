import React from "react";

const Days = (props) => {
    let{day, temp}=props
  return (
    <>
      <div
        className="flex-column border"
        style={{ borderRadius: 10 + "px", padding: 0.75 + "rem" }}
      >
        <p className="small mb-1">{day}</p>
        <p className="small mb-0">
          <strong>{temp}℃</strong>
        </p>
      </div>
    </>
  );
};

export default Days;
