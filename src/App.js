import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [numDataCenters, setNumDataCenters] = useState(1);
  const [inputValues, setInputValues] = useState([
    {
      technology: '5GSA',
      platformType: 'MWP',
      automationCluster: 1,
      nosOfNodes: 100,
      siteConfigType: 'Data Center 1',
      totalNosOfServers: 8,
      nosOfUtilityServers: 1,
      nosOfAutomationClusterServers: 3,
      nosOfRanMgmtClusterServers: 4,
      nosOfCuClusterServers: 0,
      nosOfRacks: 1,
    },
  ]);

  const handleNumDataCentersChange = (e) => {
    const num = parseInt(e.target.value);
    setNumDataCenters(num);
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      while (newValues.length < num) {
        newValues.push({
          technology: '5GSA',
          platformType: 'MWP',
          automationCluster: 1,
          nosOfNodes: 100,
          siteConfigType: `Data Center ${newValues.length + 1}`,
          totalNosOfServers: 8,
          nosOfUtilityServers: 1,
          nosOfAutomationClusterServers: 3,
          nosOfRanMgmtClusterServers: 4,
          nosOfCuClusterServers: 0,
          nosOfRacks: 1,
        });
      }
      return newValues.slice(0, num);
    });
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newValues = [...inputValues];
    newValues[index][name] = value;
    setInputValues(newValues);

    if (name === 'nosOfNodes' || name === 'automationCluster') {
      fetchCalculatedValues(newValues);
    }
  };

  const fetchCalculatedValues = async () => {
    try {
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValues),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setInputValues(data);
    } catch (error) {
      console.error('Failed to fetch calculated values:', error);
    }
  };

  useEffect(() => {
    fetchCalculatedValues();
  }, [inputValues]);

  return (
    <div className="App">
      <div>
        <label>Number of Data Centers:</label>
        <input type="number" value={numDataCenters} onChange={handleNumDataCentersChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Parameters</th>
            {inputValues.map((_, index) => (
              <th key={index}>Data Center {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['technology', 'platformType', 'automationCluster', 'nosOfNodes'].map((param, paramIndex) => (
            <tr key={paramIndex}>
              <td>{param}</td>
              {inputValues.map((values, index) => (
                <td key={index}>
                  <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} />
                </td>
              ))}
            </tr>
          ))}
          {Object.keys(inputValues[0]).filter(param => !['technology', 'platformType', 'automationCluster', 'nosOfNodes'].includes(param)).map((param, paramIndex) => (
            <tr key={paramIndex}>
              <td>{param}</td>
              {inputValues.map((values, index) => (
                <td key={index}>
                  <input name={param} value={values[param]} readOnly />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
