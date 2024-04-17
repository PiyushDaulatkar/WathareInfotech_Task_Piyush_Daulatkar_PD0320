import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Graph } from './GraphComponent';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import CountTable from './CountTable';

function App() {

  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setShowTable(false);
  };

  // 30 min data 
  const [data30min,setData30min] =useState([]);
  
  useEffect(()=>{
      const getData= async ()=>{
          const myresp=await axios.get("http://localhost:9999/api/sample-data/30min");
          // return resp.then(response=>response);
          return setData30min(myresp.data);
      }
      getData();
  },[])


const transformedData30min = [["ts", "", { role: "style" }]];

// Map remaining data
data30min.forEach(item => {
  const timePart = item.ts.split('T')[1].split('Z')[0];
  const color = item.machine_status === 1 ? "green" : item.machine_status === 0 ? "yellow" : "red";
  transformedData30min.push([timePart, 10, color]);
});


// 60 min data (1 hour)
const [data60min,setData60min] =useState([]);
  
  useEffect(()=>{
      const getData= async ()=>{
          const myresp=await axios.get("http://localhost:9999/api/sample-data/60min");
          // return resp.then(response=>response);
          return setData60min(myresp.data);
      }
      getData();
  },[])


const transformedData60min = [["ts", "", { role: "style" }]];

// Map remaining data
data60min.forEach(item => {
  const timePart = item.ts.split('T')[1].split('Z')[0];
  const color = item.machine_status === 1 ? "green" : item.machine_status === 0 ? "yellow" : "red";
  transformedData60min.push([timePart, 10, color]);
});

// 120 mins (2 hour)
const [data120min,setData120min] =useState([]);
  
  useEffect(()=>{
      const getData= async ()=>{
          const myresp=await axios.get("http://localhost:9999/api/sample-data");
          // return resp.then(response=>response);
          return setData120min(myresp.data);
      }
      getData();
  },[])


const transformedData120min = [["ts", "", { role: "style" }]];

// Map remaining data
data120min.forEach(item => {
  const timePart = item.ts.split('T')[1].split('Z')[0];
  const color = item.machine_status === 1 ? "green" : item.machine_status === 0 ? "yellow" : "red";
  transformedData120min.push([timePart, 10, color]);
});


const [showTable, setShowTable] = useState(false);

const calculateCounts = () => {
  setShowTable(true);
};


  return (
    <Router>
      <div className="App">
        <div className="button-container">
        <Link
            to="/graph1"
            className={`button ${selectedButton === 'graph1' ? 'selected' : ''}`}
            onClick={() => handleButtonClick('graph1')}
          >30 min</Link>
           <Link
            to="/graph2"
            className={`button ${selectedButton === 'graph2' ? 'selected' : ''}`}
            onClick={() => handleButtonClick('graph2')}
          >1 hr</Link>
          <Link
            to="/graph3"
            className={`button ${selectedButton === 'graph3' ? 'selected' : ''}`}
            onClick={() => handleButtonClick('graph3')}
          >2 hr</Link>
        </div>
        <div>
          <Routes>
            <Route path="/graph1" element={<Graph data={transformedData30min} />} />
            <Route path="/graph2" element={<Graph data={transformedData60min}/>} />
            <Route path="/graph3" element={<Graph data={transformedData120min}/>} />
          </Routes>
        </div>
        <button className="count-button" onClick={calculateCounts}>Calculate Counts</button>
        {showTable && (
          <CountTable
            data={selectedButton === 'graph1' ? data30min : selectedButton === 'graph2' ? data60min : data120min}
            title={selectedButton === 'graph1' ? '30 min Counts' : selectedButton === 'graph2' ? '1 hr Counts' : '2 hr Counts'}
          />
        )}
      </div>
    </Router>
  );
}

export default App;

