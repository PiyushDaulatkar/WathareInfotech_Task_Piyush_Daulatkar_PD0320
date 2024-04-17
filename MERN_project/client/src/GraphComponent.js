import React from "react";
import { Chart } from "react-google-charts";

export function Graph(props) {

const options = {
  legend: { position: "none" },
  vAxis: {
    ticks: [], // Remove y-axis markings
  },
};


  return (
    <Chart chartType="ColumnChart" width="100%" height="400px" data={props.data} options={options}/>
  );
}

export default Graph;
