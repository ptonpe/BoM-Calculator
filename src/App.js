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
      nosOfUtilityServers: 0,
      nosOfAutomationClusterServers: 0,
      nosOfRanMgmtClusterServers: 4,
      nosOfCuClusterServers: 0,
      nosOfRacks: 0,
      vCU: 0,
      vDU: 0,
      RUs: 0,
      totalCNFs: 0,
      vDU2: 0,
      vCUCPUP: 0,
      PTP: 0,
      totalNFs: 0,
      XA: 0,
      nosOfSites: 0,
      absMidhaulPer4G: 0,
      absMidhaulPer5GFDD: 0,
      absMidhaulPerTDD: 0,
      pooling4G: 0,
      pooling5GFDD: 0,
      pooling5GTDD: 0,
      absMidhaulThrough4G: 0,
      absMidhaulThrough5GFDD: 0,
      absMidhaulThrough5GTDD: 0,
      perInstance4G: 0,
      perInstance5GFDD: 0,
      perInstance5GTDD: 0,
      perInstance4GCard: 0,
      perInstance5GFDDCard: 0,
      perInstance5GTDDCard: 0,
      plannedFDDCard: 0,
      plannedTDDCard: 0,
      total4GServers: 0,
      total5GFDDServers: 0,
      total5GTDDServers: 0
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
          vCU: 0,
          vDU: 0,
          RUs: 0,
          totalCNFs: 0,
          vDU2: 0,
          vCUCPUP: 0,
          PTP: 0,
          totalNFs: 0,
          XA: 0,
          nosOfSites: 0,
          absMidhaulPer4G: 0,
          absMidhaulPer5GFDD: 0,
          absMidhaulPerTDD: 0,
          pooling4G: 0,
          pooling5GFDD: 0,
          pooling5GTDD: 0,
          absMidhaulThrough4G: 0,
          absMidhaulThrough5GFDD: 0,
          absMidhaulThrough5GTDD: 0,
          perInstance4G: 0,
          perInstance5GFDD: 0,
          perInstance5GTDD: 0,
          perInstance4GCard: 0,
          perInstance5GFDDCard: 0,
          perInstance5GTDDCard: 0,
          plannedFDDCard: 0,
          plannedTDDCard: 0,
          total4GServers: 0,
          total5GFDDServers: 0,
          total5GTDDServers: 0
        });
      }
      return newValues.slice(0, num);
    });
  };

  const handleChange = async (index, e) => {
    const { name, value } = e.target;
    const newValues = [...inputValues];
    newValues[index][name] = value;
    setInputValues(newValues);

    console.log('Updated Input Values:', newValues);  // Debugging: Log updated values

    if (['nosOfNodes', 'automationCluster', 'totalNosOfServers', 'XA', 'vCU', 'vDU', 'RUs', 'vDU2', 'vCUCPUP', 'PTP', 'nosOfSites', 'absMidhaulPer4G', 'absMidhaulPer5GFDD', 'absMidhaulPerTDD', 
    'pooling4G', 'pooling5GFDD', 'pooling5GTDD', 'plannedFDDCard', 'plannedTDDCard'].includes(name)) {
      await fetchCalculatedValues(newValues);
    }
  };

  const fetchCalculatedValues = async (values) => {
    try {
      console.log('Sending Values to Backend:', values);  // Debugging: Log values being sent to backend
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Received Calculated Values:', data);  // Debugging: Log received calculated values
      setInputValues(data);
    } catch (error) {
      console.error('Failed to fetch calculated values:', error);
    }
  };

  useEffect(() => {
    fetchCalculatedValues(inputValues);
  }, [numDataCenters]);

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
                  {param === 'technology' ? (
                    <select name={param} value={values[param]} onChange={(e) => handleChange(index, e)}>
                      <option value="4G">4G</option>
                      <option value="5GSA">5GSA</option>
                      <option value="5GNSA">5GNSA</option>
                    </select>
                  ) : param === 'platformType' ? (
                    <select name={param} value={values[param]} onChange={(e) => handleChange(index, e)}>
                      <option value="RHOCP">RHOCP</option>
                      <option value="MWP">MWP</option>
                      <option value="VMWARE">VMWARE</option>
                    </select>
                  ) : param === 'automationCluster' ? (
                    <select name={param} value={values[param]} onChange={(e) => handleChange(index, e)}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                    </select>
                  ) : (
                    <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} />
                  )}
                </td>
              ))}
            </tr>
          ))}
          {Object.keys(inputValues[0]).filter(param => !['technology', 'platformType', 'automationCluster', 'nosOfNodes', 'vCU', 'vDU', 'RUs', 'totalCNFs', 'vDU2', 'vCUCPUP', 'PTP', 'totalNFs', 'nosOfSites', 'absMidhaulPer4G', 'absMidhaulPer5GFDD', 'absMidhaulPerTDD', 'pooling4G', 'pooling5GFDD', 'pooling5GTDD', 'absMidhaulThrough4G', 'absMidhaulThrough5GFDD', 'absMidhaulThrough5GTDD', 'perInstance4G', 'perInstance5GFDD',
          'perInstance5GTDD', 'perInstance4GCard', 'perInstance5GFDDCard', 'perInstance5GTDDCard', 'plannedFDDCard', 'plannedTDDCard', 'total4GServers', 'total5GFDDServers', 'total5GTDDServers'].includes(param)).map((param, paramIndex) => (
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
      <div>
        <h3>nCMS Dimensioning</h3>
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
            {['vCU', 'vDU', 'RUs'].map((param, paramIndex) => (
              <tr key={paramIndex}>
                <td>{param}</td>
                {inputValues.map((values, index) => (
                  <td key={index}>
                    <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td>totalCNFs</td>
              {inputValues.map((values, index) => (
                <td key={index}>
                  <input name="totalCNFs" value={values.totalCNFs} readOnly />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3>MTCIL Dimensioning</h3>
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
            {['vDU2', 'vCUCPUP', 'PTP', 'XA'].map((param, paramIndex) => (
              <tr key={paramIndex}>
                <td>{param}</td>
                {inputValues.map((values, index) => (
                  <td key={index}>
                    <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td>totalNFs</td>
              {inputValues.map((values, index) => (
                <td key={index}>
                  <input name="totalNFs" value={values.totalNFs} readOnly />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3>CU vBOM</h3>
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
            {['nosOfSites', 'absMidhaulPer4G', 'absMidhaulPer5GFDD', 'absMidhaulPerTDD', 'pooling4G', 'pooling5GFDD', 'pooling5GTDD'].map((param, paramIndex) => (
              <tr key={paramIndex}>
                <td>{param}</td>
                {inputValues.map((values, index) => (
                  <td key={index}>
                    <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} />
                  </td>
                ))}
              </tr>
            ))}
            {['absMidhaulThrough4G', 'absMidhaulThrough5GFDD', 'absMidhaulThrough5GTDD', 'perInstance4G', 'perInstance5GFDD', 'perInstance5GTDD', 'perInstance4GCard', 'perInstance5GFDDCard', 
            'perInstance5GTDDCard'].map((param, paramIndex) => (
              <tr key={paramIndex}>
                <td>{param}</td>
                {inputValues.map((values, index) => (
                  <td key={index}>
                    <input name={param} value={values[param]} readOnly />
                  </td>
                ))}
              </tr>
            ))}
            {['plannedFDDCard', 'plannedTDDCard'].map((param, paramIndex) => (
              <tr key={paramIndex}>
                <td>{param}</td>
                {inputValues.map((values, index) => (
                  <td key={index}>
                    <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
