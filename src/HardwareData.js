import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HardwareData.css'; 

const HardwareData = ({ inputValues }) => {
  const [numDataCenters, setNumDataCenters] = useState(inputValues.length);
  const [hardwareDetails, setHardwareDetails] = useState([
    {
      category: 'Utility Server',
      itemType: 'Dell R650',
      itemDescription: '',
      skuNo: 'US-123',
      qty: 1,
      uom: 'Server',
    },
    {
      category: 'Automation Servers',
      itemType: 'Dell R750/R740',
      itemDescription: '',
      skuNo: 'AS-456',
      qty: 1,
      uom: 'Server',
    },
    {
      category: 'RAN Management',
      itemType: 'Dell R750/R740',
      itemDescription: '',
      skuNo: 'RM-789',
      qty: 1,
      uom: 'Server',
    },
    {
      category: 'CU Server',
      itemType: 'Server',
      itemDescription: '',
      skuNo: 'CU-101',
      qty: 1,
      uom: 'Server',
    },
    // Fabric category with specified Item Types
    {
      category: 'Fabric',
      itemType: 'Rack',
      itemDescription: '',
      skuNo: 'FAB-112',
      qty: 1,
      uom: 'Rack',
    },
    {
      category: 'Fabric',
      itemType: 'TOR Switch',
      itemDescription: '',
      skuNo: 'FAB-113',
      qty: 1,
      uom: 'Leaf',
    },
    {
      category: 'Fabric',
      itemType: 'Management Switch',
      itemDescription: '',
      skuNo: 'FAB-114',
      qty: 2,
      uom: 'Management',
    },
    {
      category: 'Fabric',
      itemType: 'Spine Switch',
      itemDescription: '',
      skuNo: 'FAB-115',
      qty: 2,
      uom: 'Spine',
    },
    {
      category: 'Fabric',
      itemType: 'SDN(CCF/BCF) Server',
      itemDescription: '',
      skuNo: 'FAB-116',
      qty: 2,
      uom: 'SDN/CCF',
    },
    // DC Accessories category with specified Item Types
    {
      category: 'DC Accessories',
      itemType: 'Leaf to servers Breakout Cable 100G',
      itemDescription: '',
      skuNo: 'DCA-131',
      qty: 2,
      uom: 'Server',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Servers 100G SFP\'s',
      itemDescription: '',
      skuNo: 'DCA-132',
      qty: 2,
      uom: 'Server',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to CCF/SDN Breakout Cable 40G',
      itemDescription: '',
      skuNo: 'DCA-133',
      qty: 1,
      uom: 'Server',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to CCF/SDN 40G SFPs',
      itemDescription: '',
      skuNo: 'DCA-134',
      qty: 1,
      uom: 'Server',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Leaf SFPs 100G',
      itemDescription: '',
      skuNo: 'DCA-135',
      qty: 2,
      uom: 'Leaf',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Leaf Trunk Cable',
      itemDescription: '',
      skuNo: 'DCA-136',
      qty: 2,
      uom: 'Leaf',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Management SFP 100G',
      itemDescription: '',
      skuNo: 'DCA-137',
      qty: 2,
      uom: 'Leaf',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Management Trunk Cable',
      itemDescription: '',
      skuNo: 'DCA-138',
      qty: 1,
      uom: 'Leaf',
    },
    {
      category: 'DC Accessories',
      itemType: 'Management to servers Ethernet cable',
      itemDescription: '',
      skuNo: 'DCA-139',
      qty: 2,
      uom: 'Server',
    },
    {
      category: 'DC Accessories',
      itemType: 'Management to CCF/SDN Ethernet cable',
      itemDescription: '',
      skuNo: 'DCA-140',
      qty: 4,
      uom: 'CCF/SDN',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Spine SFPs 100G',
      itemDescription: '',
      skuNo: 'DCA-141',
      qty: 2,
      uom: 'Leaf',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Spine Trunk Cable',
      itemDescription: '',
      skuNo: 'DCA-142',
      qty: 1,
      uom: 'Leaf',
    },
  ]);

  useEffect(() => {
    setNumDataCenters(inputValues.length);
  }, [inputValues]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newDetails = [...hardwareDetails];
    newDetails[index][name] = value;
    setHardwareDetails(newDetails);
  };

  const getRowSpan = (category) => {
    return hardwareDetails.filter((item) => item.category === category).length;
  };

  let prevCategory = '';

  return (
    <div>
      <h2>Hardware Details</h2>
      <Link to="/">
        <button>Back to Main Page</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th rowSpan={hardwareDetails.length + 1}>
                Deployment Scenario</th>
            <th>Category</th>
            <th>Item Type</th>
            <th>Item Description</th>
            <th>SKU No</th>
            <th>Qty</th>
            <th>UOM</th>
            {Array.from({ length: numDataCenters }, (_, i) => (
              <th key={i}>Data Center {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hardwareDetails.map((hardware, index) => {
            const showCategory = hardware.category !== prevCategory;
            if (showCategory) prevCategory = hardware.category;
            return (
              <tr key={index} className={showCategory ? 'category-spacing' : ''}>
                {index === 0 && (
                  <td rowSpan={hardwareDetails.length + 1} className="sideways-text">
                    {inputValues[0].technology} _ {inputValues[0].platformType}
                  </td>
                )}
                {showCategory && (
                  <td rowSpan={getRowSpan(hardware.category)} className="grey-box">
                    {hardware.category}
                  </td>
                )}
                <td>
                  <input 
                    name="itemType" 
                    value={hardware.itemType} 
                    readOnly 
                    className={hardware.category === 'DC Accessories' ? 'long-text-field' : ''}
                  />
                </td>
                <td>
                  <select
                    name="itemDescription"
                    value={hardware.itemDescription}
                    className="long-text-field"
                    onChange={(e) => handleChange(index, e)}
                  >
                    <option value="">Select Description</option>
                    <option value="Description 1">Description 1</option>
                    <option value="Description 2">Description 2</option>
                  </select>
                </td>
                <td>
                  <input name="skuNo" value={hardware.skuNo} className="medium-text-field" readOnly />
                </td>
                <td>
                  <input
                    name="qty"
                    type="number"
                    value={hardware.qty}
                    className="short-text-field"
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <input name="uom" value={hardware.uom} className="short-text-field" readOnly />
                </td>
                {Array.from({ length: numDataCenters }, (_, i) => (
                  <td key={i}>
                    <input
                      name={`dataCenter${i + 1}`}
                      value={hardware[`dataCenter${i + 1}`] || ''}
                      className="short-text-field"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HardwareData;
