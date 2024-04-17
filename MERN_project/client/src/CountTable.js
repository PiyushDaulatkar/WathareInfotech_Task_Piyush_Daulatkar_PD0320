import React from 'react';
import './App.css';

function CountTable({ data, title }) {
    const onesCount = data.filter(item => item.machine_status === 1).length;
    const zerosCount = data.filter(item => item.machine_status === 0).length;
  
    return (
        <>
        <h2>{title}</h2>
      <div className="table-container">
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ones</td>
              <td>{onesCount}</td>
            </tr>
            <tr>
              <td>Zeros</td>
              <td>{zerosCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </>
    );
  }
  
  export default CountTable;
