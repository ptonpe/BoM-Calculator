import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HardwareData from './HardwareData';

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
      nosOfUtilityServers: 2,
      nosOfAutomationClusterServers: 0,
      nosOfRanMgmtClusterServers: 4,
      nosOfCuClusterServers: 0,
      nosOfRacks: 0,
      DU: 'SNO',
      vCU: 0,
      vDU: 0,
      RUs: 0,
      totalCNFs: 0,
      vDU2: 0,
      vCUCPUP: 0,
      PTP: 0,
      totalNFs: 0,
      XApc: 0,
      XAstor: 0,
      additionalServers: 0,
      nosOfSites: 0,
      cellsPerSector4G: 0,
      cellsPerSectorFDD: 0,
      cellsPerSectorTDD: 0,
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
      total5GTDDServers: 0,
      isCU: 0,
      masterPCORE: 0,
      mtcilPCORE: 0,
      totalvCUInstances: 0,
      totalClusterPCORE: 0,
      totalCUServers: 0,
      isCURedundant: 0,
      redundancyPercentage: 0,
      totalCURedundancy: 0,
      nCMS: 0,
      CRDL: 32,
      MasterComponents: 36,
      Sdaas: 5,
      MTCIL: 16,
      ODF: 12,
      OSD: 12,
      totalNosOfPCORE: 0,
      DU: 'Stretch Cluster',
      isFixed: 'Yes'
    },
  ]);
  const [descriptionToItemNumber, setDescriptionToItemNumber] = useState({});

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
          DU: 'SNO',
          vCU: 0,
          vDU: 0,
          RUs: 0,
          totalCNFs: 0,
          vDU2: 0,
          vCUCPUP: 0,
          PTP: 0,
          totalNFs: 0,
          XApc: 0,
          XAstor: 0,
          additionalServers: 0,
          nosOfSites: 0,
          cellsPerSector4G: 0,
          cellsPerSectorFDD: 0,
          cellsPerSectorTDD: 0,
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
          total5GTDDServers: 0,
          isCU: 0,
          masterPCORE: 0,
          mtcilPCORE: 0,
          totalvCUInstances: 0,
          totalClusterPCORE: 0,
          totalCUServers: 0,
          isCURedundant: 0,
          redundancyPercentage: 0,
          totalCURedundancy: 0,
          nCMS: 0,
          CRDL: 0,
          MasterComponents: 0,
          Sdaas: 0,
          MTCIL: 0,
          ODF: 0,
          OSD: 0,
          totalNosOfPCORE: 0,
          DU: 'Stretch Cluster',
          isFixed: 'Yes'
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

    if (['nosOfNodes', 'automationCluster', 'totalNosOfServers', 'XApc', 'XAstor', 'vCU', 'vDU', 'RUs', 'vDU2', 'vCUCPUP', 'PTP', 'nosOfSites', 'absMidhaulPer4G', 'absMidhaulPer5GFDD', 'absMidhaulPerTDD',
      'pooling4G', 'pooling5GFDD', 'pooling5GTDD', 'plannedFDDCard', 'plannedTDDCard', 'isCU', 'isCURedundant', 'redundancyPercentage',
      'cellsPerSector4G', 'cellsPerSectorFDD', 'cellsPerSectorTDD', 'DU'].includes(name)) {
      await fetchCalculatedValues(newValues);
    }
  };

  const fetchCalculatedValues = async (values) => {
    try {
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
      setInputValues(data);
    } catch (error) {
      console.error('Failed to fetch calculated values:', error);
    }
  };

  useEffect(() => {
    fetchCalculatedValues(inputValues);
  }, [numDataCenters]);

  const fetchData = async () => {
    const response = await fetch('/data.txt');
    const text = await response.text();
    const lines = text.split('\n');
    const data = {};

    lines.forEach(line => {
      const [description, itemNumber] = line.split(':');
      if (description && itemNumber) {
        data[description.trim()] = itemNumber.trim();
      }
    });

    return data;
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setDescriptionToItemNumber(data);
    };

    loadData();
  }, []);

  const paramLabels = {
    technology: 'Technology',
    platformType: 'Platform Type',
    automationCluster: 'Automation Cluster',
    nosOfNodes: 'Number of Nodes',
    siteConfigType: 'Site Name',
    totalNosOfServers: 'Total Servers',
    nosOfUtilityServers: 'Utility Servers',
    nosOfAutomationClusterServers: 'Automation Cluster Servers',
    nosOfRanMgmtClusterServers: 'RAN Mgmt Cluster Servers',
    nosOfCuClusterServers: 'CU Cluster Servers',
    nosOfRacks: 'Number of Racks',
    DU: 'DU',
    vCU: 'vCU',
    vDU: 'vDU',
    RUs: 'RUs',
    totalCNFs: 'Total CNFs',
    vDU2: 'vDU2',
    vCUCPUP: 'vCU (CP+UP)',
    PTP: 'PTP',
    XApc: 'XA (PC)',
    XAstor: 'XA (Storage)',
    totalNFs: 'Total NFs',
    nosOfSites: 'Number of Sites',
    cellsPerSector4G: '4G Cells Per Sector',
    cellsPerSectorFDD: '5G FDD Cells Per Sector',
    cellsPerSectorTDD: '5G TDD Cells Per Sector',
    absMidhaulPer4G: 'Abs Midhaul Per 4G',
    absMidhaulPer5GFDD: 'Abs Midhaul Per 5G FDD',
    absMidhaulPerTDD: 'Abs Midhaul Per TDD',
    pooling4G: 'Pooling 4G',
    pooling5GFDD: 'Pooling 5G FDD',
    pooling5GTDD: 'Pooling 5G TDD',
    absMidhaulThrough4G: 'Abs Midhaul Through 4G',
    absMidhaulThrough5GFDD: 'Abs Midhaul Through 5G FDD',
    absMidhaulThrough5GTDD: 'Abs Midhaul Through 5G TDD',
    perInstance4G: 'Per Instance 4G',
    perInstance5GFDD: 'Per Instance 5G FDD',
    perInstance5GTDD: 'Per Instance 5G TDD',
    perInstance4GCard: 'Per Instance 4G Cardinality',
    perInstance5GFDDCard: 'Per Instance 5G FDD Cardinality',
    perInstance5GTDDCard: 'Per Instance 5G TDD Cardinality',
    plannedFDDCard: 'Planned FDD Cardinality',
    plannedTDDCard: 'Planned TDD Cardinality',
    total4GServers: 'Total 4G Servers',
    total5GFDDServers: 'Total 5G FDD Servers',
    total5GTDDServers: 'Total 5G TDD Servers',
    isCU: 'Is CU',
    masterPCORE: 'Master PCORE',
    mtcilPCORE: 'MTCIL PCORE',
    totalvCUInstances: 'Total vCU Instances',
    totalClusterPCORE: 'Total Cluster PCORE',
    totalCUServers: 'Total CU Servers',
    isCURedundant: 'Is CU Redundant',
    redundancyPercentage: 'Redundancy Percentage',
    totalCURedundancy: 'Total CU Redundancy',
    CRDL: 'CRDL',
    MasterComponents: 'Master Components',
    Sdaas: 'SDAAS',
    MTCIL: 'MTCIL',
    ODF: 'ODF',
    OSD: 'OSD',
    nCMS: 'mCMS',
    totalNosOfPCORE: 'Total PCORE',
    isFixed: 'Fixed Values?'
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={
            <div>
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
                      <td>{paramLabels[param]}</td>
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
                    'perInstance5GTDD', 'perInstance4GCard', 'perInstance5GFDDCard', 'perInstance5GTDDCard', 'plannedFDDCard', 'plannedTDDCard', 'total4GServers', 'total5GFDDServers', 'XApc', 'XAstor', 'diskCapacity', 'deltaRequirement', 'additionalServers',
                    'total5GTDDServers', 'isCU', 'masterPCORE', 'mtcilPCORE', 'totalvCUInstances', 'totalClusterPCORE', 'totalCUServers', 'isCURedundant', 'redundancyPercentage', 'totalCURedundancy',
                    'cellsPerSector4G', 'cellsPerSectorFDD', 'cellsPerSectorTDD', 'CRDL', 'MasterComponents', 'Sdaas', 'MTCIL', 'ODF', 'OSD', 'nCMS', 'totalNosOfPCORE'].includes(param)).map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
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
                <h3>RAN Management vBOM</h3>
                <h4>mCMS Dimensioning</h4>
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
                        <td>{paramLabels[param]}</td>
                        {inputValues.map((values, index) => (
                          <td key={index}>
                            <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} />
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td>{paramLabels['totalCNFs']}</td>
                      {inputValues.map((values, index) => (
                        <td key={index}>
                          <input name="totalCNFs" value={values.totalCNFs} readOnly />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <h4>XA Dimensioning</h4>
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
                    {['XApc', 'XAstor'].map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
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
              <div>
                <h4>MTCIL Dimensioning</h4>
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
                    {['DU', 'vDU2', 'vCUCPUP', 'PTP'].map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
                        {inputValues.map((values, index) => (
                          <td key={index}>
                            {param === 'DU' ? (
                              <select name={param} value={values[param]} onChange={(e) => handleChange(index, e)} >
                                <option value="SNO">SNO</option>
                                <option value="Stretch Cluster">Stretch Cluster</option>
                              </select>
                            ) : (
                              <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)}
                                disabled={values.DU === 'SNO' && (param === 'vDU2' || param === 'PTP')} />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td>{paramLabels['totalNFs']}</td>
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
                <h4></h4>
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
                    {['isFixed', 'nCMS', 'CRDL', 'MasterComponents', 'Sdaas', 'MTCIL', 'ODF', 'OSD', 'totalNosOfPCORE'].map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
                        {inputValues.map((values, index) => (
                          <td key={index}>
                            {param === 'isFixed' ? (
                              <select name={param} value={values[param]} onChange={(e) => handleChange(index, e)}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            ) : (
                              < input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} 
                              readOnly={values.isFixed === 'Yes' && ['CRDL', 'MasterComponents', 'Sdaas', 'ODF', 'OSD'].includes(param)} />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}

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
                    {/* 4G Data Fields */}
                    {['nosOfSites', 'cellsPerSector4G', 'absMidhaulPer4G', 'pooling4G'].map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
                        {inputValues.map((values, index) => (
                          <td key={index}>
                            <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} />
                          </td>
                        ))}
                      </tr>
                    ))}
                    {['absMidhaulThrough4G', 'perInstance4G', 'perInstance4GCard'].map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
                        {inputValues.map((values, index) => (
                          <td key={index}>
                            <input name={param} value={values[param]} readOnly />
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td className='bold-input'>{paramLabels['total4GServers']}</td>
                      {inputValues.map((values, index) => (
                        <td key={index}>
                          <input name="total4GServers" value={values.total4GServers} onChange={(e) => handleChange(index, e)} />
                        </td>
                      ))}
                    </tr>

                    {/* 5GFDD Data Fields */}
                    {['cellsPerSectorFDD', 'absMidhaulPer5GFDD', 'pooling5GFDD'].map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
                        {inputValues.map((values, index) => (
                          <td key={index}>
                            <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} />
                          </td>
                        ))}
                      </tr>
                    ))}
                    {['absMidhaulThrough5GFDD', 'perInstance5GFDD', 'perInstance5GFDDCard'].map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
                        {inputValues.map((values, index) => (
                          <td key={index}>
                            <input name={param} value={values[param]} readOnly />
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td>{paramLabels['plannedFDDCard']}</td>
                      {inputValues.map((values, index) => (
                        <td key={index}>
                          <input name="plannedFDDCard" value={values.plannedFDDCard} onChange={(e) => handleChange(index, e)} />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className='bold-input'>{paramLabels['total5GFDDServers']}</td>
                      {inputValues.map((values, index) => (
                        <td key={index}>
                          <input name="total5GFDDServers" value={values.total5GFDDServers} onChange={(e) => handleChange(index, e)} />
                        </td>
                      ))}
                    </tr>

                    {/* 5GTDD Data Fields */}
                    {['cellsPerSectorTDD', 'absMidhaulPerTDD', 'pooling5GTDD'].map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
                        {inputValues.map((values, index) => (
                          <td key={index}>
                            <input name={param} value={values[param]} onChange={(e) => handleChange(index, e)} />
                          </td>
                        ))}
                      </tr>
                    ))}
                    {['absMidhaulThrough5GTDD', 'perInstance5GTDD', 'perInstance5GTDDCard'].map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
                        {inputValues.map((values, index) => (
                          <td key={index}>
                            <input name={param} value={values[param]} readOnly />
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td>{paramLabels['plannedTDDCard']}</td>
                      {inputValues.map((values, index) => (
                        <td key={index}>
                          <input name="plannedTDDCard" value={values.plannedTDDCard} onChange={(e) => handleChange(index, e)} />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className='bold-input'>{paramLabels['total5GTDDServers']}</td>
                      {inputValues.map((values, index) => (
                        <td key={index}>
                          <input name="total5GTDDServers" value={values.total5GTDDServers} onChange={(e) => handleChange(index, e)} />
                        </td>
                      ))}
                    </tr>

                    {/* CU and Other Data Fields */}
                    {['isCU', 'masterPCORE', 'mtcilPCORE', 'totalvCUInstances', 'totalClusterPCORE', 'totalCUServers', 'isCURedundant', 'redundancyPercentage', 'totalCURedundancy'].map((param, paramIndex) => (
                      <tr key={paramIndex}>
                        <td>{paramLabels[param]}</td>
                        {inputValues.map((values, index) => (
                          <td key={index}>
                            {param === 'isCU' || param === 'isCURedundant' ? (
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
                  </tbody>
                </table>
              </div>
              <Link to="/hardware"><button>Go to Hardware Page</button></Link>
            </div>
          } />
          <Route path="/hardware" element={<HardwareData inputValues={inputValues} descriptionToItemNumber={descriptionToItemNumber} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
