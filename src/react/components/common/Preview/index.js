import React from "react";
import "./styles.css";

export const Preview = ({ data, header }) => (
  <div className="preview">
    {Object.keys(data).map((item, index) => (
      <div key={index}>
        <span>{header[index]}:</span>
        <span>{data[item]}</span>
      </div>
    ))}
  </div>
);
