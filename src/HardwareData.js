import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HardwareData.css'; 
import * as XLSX from 'xlsx';

const HardwareData = ({ inputValues, descriptionToItemNumber }) => {
  const [numDataCenters, setNumDataCenters] = useState(inputValues.length);
  const [hardwareDetails, setHardwareDetails] = useState([
    {
      category: 'Utility Server',
      itemType: 'Dell R650',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Server',
    },
    {
      category: 'Automation Servers',
      itemType: 'Dell R750/R740',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Server',
    },
    {
      category: 'RAN Management',
      itemType: 'Dell R750/R740',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Server',
    },
    {
      category: 'CU Server',
      itemType: 'Dell R750/R740',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Server',
    },
    {
      category: 'Storage Server',
      itemType: 'Storage',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Server',
    },
    {
      category: 'mTA Analytics',
      itemType: 'mTA',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Server',
    },

    // Fabric category with specified Item Types
    {
      category: 'Fabric',
      itemType: 'Rack',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Rack',
    },
    {
      category: 'Fabric',
      itemType: 'TOR Switch',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'Leaf',
    },
    {
      category: 'Fabric',
      itemType: 'Management Switch',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Management',
    },
    {
      category: 'Fabric',
      itemType: 'Spine Switch',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'Spine',
    },
    {
      category: 'Fabric',
      itemType: 'SDN(CCF/BCF) Server',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'SDN/CCF',
    },
    // DC Accessories category with specified Item Types
    {
      category: 'DC Accessories',
      itemType: 'Leaf to servers Breakout Cable 100G',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'Server',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Servers 100G SFP\'s',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'Server',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to CCF/SDN Breakout Cable 40G',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'Server',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to CCF/SDN 40G SFPs',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'Server',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Leaf SFPs 100G',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'Leaf',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Leaf Trunk Cable',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Leaf',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Management SFP 100G',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'Leaf',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Management Trunk Cable',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Leaf',
    },
    {
      category: 'DC Accessories',
      itemType: 'Management to servers Ethernet cable',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'Server',
    },
    {
      category: 'DC Accessories',
      itemType: 'Management to CCF/SDN Ethernet cable',
      itemDescription: '',
      skuNo: '',
      qty: 4,
      uom: 'CCF/SDN',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Spine SFPs 100G',
      itemDescription: '',
      skuNo: '',
      qty: 2,
      uom: 'Leaf',
    },
    {
      category: 'DC Accessories',
      itemType: 'Leaf to Spine Trunk Cable',
      itemDescription: '',
      skuNo: '',
      qty: 1,
      uom: 'Leaf',
    },
  ]);

  const itemDescriptions = {
    'Dell R650': ["Dell 15G Master Control Node R650, DC", "Dell 15G Master Control Node R650, AC",
      "Dell 16G Master Control Node Intel, AC (1x5418Y(24c), 256GB RAM, 2x Intel E810 Dual Port NIC, SSD 2x 1.6TB SAS MU, PSU 800W (AC))", 
      "Dell 16G Master Control Node Intel, DC (1x5418Y(24c), 256GB RAM, 2x Intel E810 Dual Port NIC, SSD 2x 1.6TB SAS MU, PSU 1100W (DC))"],

    'Dell R750/R740': [
      "Dell 15G Standard Worker R750XL, 2x6330N (28c), 512GB RAM, 4x Intel E810 Dual Port, SSD 2x480GB 4x1.6TB SAS MU, PSU 1100W (DC)",
      "Dell 15G Standard Worker R750XL, 2x6330N (28c), 512GB RAM, 4x Intel E810 Dual Port, SSD 2x480GB 4x1.6TB SAS MU, PSU 1400W (AC)",
      "Dell PowerEdge R740 XL 2x 26c 512GB vCompute/Worker /vDU/5GC/CU/HCI  Node -2x600GB SAS HDD4x1.6TB SSD(7.6TB)  storage  DC",
      "Dell PowerEdge R740 XL 2x 26c 512GB vCompute/Worker /vDU/5GC/CU/HCI  Node -2x600GB SAS HDD4x1.6TB SSD(7.6TB)  storage  AC",
      "Dell 16G Standard Worker R660, Intel, AC ( 2x 6438N(32c), 512GB RAM, 2x Intel E810 Quad port NIC, SSD 4x 1.6TB SAS MU, PSU 1100W(AC))",
      "Dell 16G Standard Worker R660, Standard Worker Intel, DC 2x 6438N(32c), 512GB RAM, 2x Intel E810 Quad port NIC, SSD 4x 1.6TB SAS MU, PSU 1100W(DC)",
    ],
    'mTA': [
      "2x 5418Y(24c), 512GB RAM, 1x Intel E810 Quad Port NIC OCP, 2x Intel E810 Dual Port NIC, SSD 8x 3.2TB SAS MU, PSU 1100W(AC)",
      "2x 5418Y(24c), 512GB RAM, 1x Intel E810 Quad Port NIC OCP, 2x Intel E810 Dual Port NIC, SSD 8x 3.2TB SAS MU, PSU 1100W(DC)",
    ],
    'Storage': [
      "Dell 16G Standard Storage Node AC 1x6448Y(32c), 512GB RAM, 2x Intel E810 Dual Port NIC, SSD 8x 3.2TB NVMe MU, PSU 1100W(AC)",
      "Dell 16G Standard Storage Node DC 1x6448Y(32c), 512GB RAM, 2x Intel E810 Dual Port NIC, SSD 8x 3.2TB NVMe MU, PSU 1100W(DC)",
    ],
    'Rack': [
      "HPE NFV/NON -NFV 42U Rack with 1P G2 Basic PDU - International",
      "HPE OPEN STACK HP RACK & US/JP AC POWER", "OPEN STACK HP RACK DC POWER"
    ],
    'TOR Switch': [
      "STAND-ALONE NON STDN - TOR ARISTA 7050X3, 32x100GBE QSFP+ & 2XSFP+ SWITCH, REAR TO FRONT AIR, 2XAC",
      "STAND-ALONE NON STDN - TOR ARISTA 7050X3, 32x100GBE QSFP+ & 2XSFP+ SWITCH, REAR TO FRONT AIR, 2XDC",
      "S5232-F-ON AC ToR - Leaf Switch (2 per rack) 32x100G, 32xQSFP28, 2x10GbE SFP+, 2xAC PSU",
      "S5232-F-ON AC ToR - Leaf Switch (2 per rack) 32x100G, 32xQSFP28, 2x10GbE SFP+, 2xDC PSU",
      "LEAF/SPINE/ToR ARISTA 7050X3, 32 x 100GbE QSFP+ & 2xSFP+ SWITCH, REAR TO FRONT AIR, 2xAC 2xC13-C14",
      "LEAF/SPINE/ToR ARISTA 7050X3, 32 x 100GbE QSFP+ & 2xSFP+ SWITCH, REAR TO FRONT AIR, 2xDC",
    ],
    'Management Switch': [
      "MANAGEMENT SWITCH - ARISTA 7010T, 48x RJ45 (100/1000), 4 x SFP+ (1/10GbE) SWITCH, REAR TO FRONT AIR",
      "CISCO NEXUS 92348GC-X – AC MANAGED 48 x 10/100/1000 + 4 x 1/10/25 GIGABIT SFP28 + 2 x 40/100 Gig",
      "Cisco Nexus mgmt switch 92348GC-X – AC 48 x 10/100/1000 + 4 x 1/10/25 Gigabit SFP28 + 2 x 40/100 Gig"
    ],
    'Spine Switch': [
      "S5232-F-ON DC ToR - Spine Switch 32x100G, 32xQSFP28, 2x10GbE SFP+, 2xAC PSU",
      "S5232-F-ON DC ToR - Spine Switch 32x100G, 32xQSFP28, 2x10GbE SFP+, 2xDC PSU"
    ],
    'SDN(CCF/BCF) Server': ["Arista CCF Controller (aka BCF) – Dell 15G R450"],
    'Leaf to servers Breakout Cable 100G': [
      "3M - 100G Multimode breakout  (OM4) 50/125 - 12 Strand Plenum MPO Armored Harness with MPO(Female)-LC connectors. OM4 (Aqua) Plenum MPO Armored Harness for 40G/100G fiber optic networks.",
      "5M  (15FT)- 100G Multimode breakout  (OM4) 50/125  12 Strand Plenum MPO Armored Harness with MPO(Female)-LC connectors. OM4 (Aqua) Plenum MPO Armored Harness for 40G/100G fiber optic networks."
    ],
    'Leaf to Servers 100G SFP\'s': ["QSFP28,100m,100GBASE-SR4,4x 850nm VCSEL, MMF,"],
    'Leaf to CCF/SDN Breakout Cable 40G': ["Cable- 40G multimode Fanout Cables MPO-3 meter Plenum Fiber Optic Cable, 40Gb MTP(MPO)/ALC Breakout, OM3"],
    'Leaf to CCF/SDN 40G SFPs': ["QSFP: Finisar FTL410QE2C 40GBase-SR4 QSFP+ Transceiver"],
    'Leaf to Leaf SFPs 100G': ["QSFP28,100m,100GBASE-SR4,4x 850nm VCSEL, MMF,"],
    'Leaf to Leaf Trunk Cable': [
      "Cable- 2meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#69010",
      "Cable- 1meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#68019",
      "Cable- 10M (33ft)MTP Female to Female 12 Fibers OM3 50/125 Multimode , MTP Elite Type B OM4",
      "3 Meter Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4",
      "1M -12 Fiber Plenum 100G MTP® Trunk Cable w/FiberShield Multimode 50/122-1 Meter MTP-MTP Connectors Type B OM4",
      "2 Meter Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4",
      "10M  (33FT) Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4"
    ],
    'Leaf to Management SFP 100G': ["QSFP28,100m,100GBASE-SR4,4x 850nm VCSEL, MMF,"],
    'Leaf to Management Trunk Cable': [
      "Cable- 2meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#69010",
      "Cable- 1meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#68019",
      "Cable- 10M (33ft)MTP Female to Female 12 Fibers OM3 50/125 Multimode , MTP Elite Type B OM4",
      "3 Meter Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4",
      "1M -12 Fiber Plenum 100G MTP® Trunk Cable w/FiberShield Multimode 50/122-1 Meter MTP-MTP Connectors Type B OM4",
      "2 Meter Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4",
      "10M  (33FT) Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4"
    ],
    'Management to servers Ethernet cable': ["GGG-EEE-009 Generic CAT6 9 feet Ethernet cable RJ45"],
    'Management to CCF/SDN Ethernet cable': ["GGG-EEE-009 Generic CAT6 9 feet Ethernet cable RJ45"],
    'Leaf to Spine SFPs 100G': ["QSFP28,100m,100GBASE-SR4,4x 850nm VCSEL, MMF,"],
    'Leaf to Spine Trunk Cable': [
      "Cable- 2meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#69010",
      "Cable- 1meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#68019",
      "Cable- 10M (33ft)MTP Female to Female 12 Fibers OM3 50/125 Multimode , MTP Elite Type B OM4",
      "3 Meter Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4",
      "1M -12 Fiber Plenum 100G MTP® Trunk Cable w/FiberShield Multimode 50/122-1 Meter MTP-MTP Connectors Type B OM4",
      "2 Meter Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4",
      "10M  (33FT) Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4"
    ]
  };

  useEffect(() => {
    setNumDataCenters(inputValues.length);
  }, [inputValues]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newDetails = [...hardwareDetails];
    newDetails[index][name] = value;
    if (name === 'itemDescription' && descriptionToItemNumber[value]) {
      newDetails[index]['skuNo'] = descriptionToItemNumber[value];
    }
    setHardwareDetails(newDetails);
  };

  const getRowSpan = (category) => {
    return hardwareDetails.filter((item) => item.category === category).length;
  };

  let prevCategory = '';

  const exportToExcel = () => {
    const tableData = hardwareDetails.map((hardware, index) => {
      const rowData = {
        'Category': hardware.category,
        'Item Type': hardware.itemType,
        'Item Description': hardware.itemDescription,
        'SKU No': hardware.skuNo,
        'Qty': hardware.qty,
        'UOM': hardware.uom,
      };

      inputValues.forEach((inputValue, i) => {
        rowData[`Data Center ${i + 1}`] = hardware.category === 'Utility Server'
          ? inputValue.nosOfUtilityServers * hardware.qty
          : hardware.category === 'Automation Servers'
          ? inputValue.nosOfAutomationClusterServers
          : hardware.category === 'RAN Management'
          ? inputValue.nosOfRanMgmtClusterServers
          : hardware.category === 'CU Server'
          ? inputValue.nosOfCuClusterServers
          : hardware.itemType === 'Rack'
          ? inputValue.nosOfRacks
          : hardware.itemType === 'TOR Switch'
          ? inputValue.nosOfRacks * 2
          : hardware.itemType === 'Management Switch'
          ? inputValue.nosOfRacks * hardware.qty
          : hardware.itemType === 'Spine Switch'
          ? (inputValue.nosOfRacks <= 1 ? 0 : 2)
          : hardware.itemType === 'SDN(CCF/BCF) Server'
          ? ((inputValue.nosOfRacks * hardware.qty) == 0 ? 0 : (inputValue.nosOfRacks * hardware.qty) <= 24 ? 2 : 4)
          : hardware.itemType === 'Leaf to servers Breakout Cable 100G'
          ? inputValue.totalNosOfServers * hardware.qty
          : hardware.itemType === 'Leaf to Servers 100G SFP\'s'
          ? inputValue.totalNosOfServers * hardware.qty
          : hardware.itemType === 'Leaf to CCF/SDN Breakout Cable 40G'
          ? ((inputValue.nosOfRacks * hardware.qty) == 0 ? 0 : (inputValue.nosOfRacks * hardware.qty) <= 24 ? 2 : 4) * hardware.qty
          : hardware.itemType === 'Leaf to CCF/SDN 40G SFPs'
          ? ((inputValue.nosOfRacks * hardware.qty) == 0 ? 0 : (inputValue.nosOfRacks * hardware.qty) <= 24 ? 2 : 4) * hardware.qty
          : hardware.itemType === 'Leaf to Leaf SFPs 100G'
          ? (inputValue.nosOfRacks * hardware.qty) * hardware.qty
          : hardware.itemType === 'Leaf to Leaf Trunk Cable'
          ? (inputValue.nosOfRacks * 2) * hardware.qty
          : hardware.itemType === 'Leaf to Management SFP 100G'
          ? (inputValue.nosOfRacks * hardware.qty) * hardware.qty
          : hardware.itemType === 'Leaf to Management Trunk Cable'
          ? (inputValue.nosOfRacks * 2) * hardware.qty
          : hardware.itemType === 'Management to servers Ethernet cable'
          ? inputValue.totalNosOfServers * hardware.qty
          : hardware.itemType === 'Management to CCF/SDN Ethernet cable'
          ? ((inputValue.nosOfRacks * hardware.qty) == 0 ? 0 : (inputValue.nosOfRacks * hardware.qty) <= 24 ? 2 : 4) * hardware.qty
          : hardware.itemType === 'Leaf to Spine SFPs 100G'
          ? (inputValue.nosOfRacks * hardware.qty) * (inputValue.nosOfRacks <= 1 ? 0 : 2) * hardware.qty
          : hardware.itemType === 'Leaf to Spine Trunk Cable'
          ? (inputValue.nosOfRacks * 2) * (inputValue.nosOfRacks <= 1 ? 0 : 2) * hardware.qty
          : hardware.itemType === 'mTA'
          ? (inputValues[i].totalmTAServers)
          : hardware.itemType === 'Storage'
          ? (inputValues[i].storageServers)
          : hardware[`dataCenter${i + 1}`] || '';
      });

      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hardware Data');

    XLSX.writeFile(workbook, 'hardware_data.xlsx');
  };




  return (
    <div>
      <h2>Hardware Details</h2>
      <Link to="/main">
        <button>Back to Main Page</button>
      </Link>
      <button className="export-button" onClick={exportToExcel}> Export to Excel </button>
      <table>
        <thead>
          <tr>
            <th rowSpan={hardwareDetails.length + 1}>Deployment Scenario</th>
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
                    className="extra-long-text-field"
                    onChange={(e) => handleChange(index, e)}
                  >
                    <option value="">Select Description</option>
                    {(Array.isArray(itemDescriptions[hardware.itemType]) ? itemDescriptions[hardware.itemType] : []).map((description, descIndex) => (
                      <option key={descIndex} value={description}>{description}</option>
                    ))}
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
                    readOnly
                  />
                </td>
                <td>
                  <input name="uom" value={hardware.uom} className="short-text-field" readOnly />
                </td>
                {Array.from({ length: numDataCenters }, (_, i) => (
                  <td key={i}>
                    <input
                      name={`dataCenter${i + 1}`}
                      value={
                        hardware.category === 'Utility Server'
                          ? inputValues[i].nosOfUtilityServers * hardware.qty
                          : hardware.category === 'Automation Servers'
                          ? inputValues[i].nosOfAutomationClusterServers
                          : hardware.category === 'RAN Management'
                          ? inputValues[i].nosOfRanMgmtClusterServers
                          : hardware.category === 'CU Server'
                          ? inputValues[i].nosOfCuClusterServers
                          : hardware.itemType === 'Rack'
                          ? inputValues[i].nosOfRacks
                          : hardware.itemType === 'TOR Switch'
                          ? inputValues[i].nosOfRacks * 2
                          : hardware.itemType === 'Management Switch'
                          ? inputValues[i].nosOfRacks * hardware.qty
                          : hardware.itemType === 'Spine Switch'
                          ? (
                            inputValues[i].nosOfRacks <= 1 ? 0 : 2
                          )
                          : hardware.itemType === 'SDN(CCF/BCF) Server'
                          ? (
                            (inputValues[i].nosOfRacks * hardware.qty) == 0 ? 0 : (inputValues[i].nosOfRacks * hardware.qty) <= 24 ? 2 : 4 
                          )
                          : hardware.itemType === 'Leaf to servers Breakout Cable 100G'
                          ? inputValues[i].totalNosOfServers * hardware.qty
                          : hardware.itemType === 'Leaf to Servers 100G SFP\'s'
                          ? inputValues[i].totalNosOfServers * hardware.qty
                          : hardware.itemType === 'Leaf to CCF/SDN Breakout Cable 40G'
                          ? ((inputValues[i].nosOfRacks * hardware.qty) == 0 ? 0 : (inputValues[i].nosOfRacks * hardware.qty) <= 24 ? 2 : 4) * hardware.qty
                          : hardware.itemType === 'Leaf to CCF/SDN 40G SFPs'
                          ? ((inputValues[i].nosOfRacks * hardware.qty) == 0 ? 0 : (inputValues[i].nosOfRacks * hardware.qty) <= 24 ? 2 : 4) * hardware.qty
                          : hardware.itemType === 'Leaf to Leaf SFPs 100G'
                          ? (inputValues[i].nosOfRacks * hardware.qty) * hardware.qty
                          : hardware.itemType === 'Leaf to Leaf Trunk Cable'
                          ? (inputValues[i].nosOfRacks * 2) * hardware.qty
                          : hardware.itemType === 'Leaf to Management SFP 100G'
                          ? (inputValues[i].nosOfRacks * hardware.qty) * hardware.qty
                          : hardware.itemType === 'Leaf to Management Trunk Cable'
                          ? (inputValues[i].nosOfRacks * 2) * hardware.qty
                          : hardware.itemType === 'Management to servers Ethernet cable'
                          ? inputValues[i].totalNosOfServers * hardware.qty
                          : hardware.itemType === 'Management to CCF/SDN Ethernet cable'
                          ? ((inputValues[i].nosOfRacks * hardware.qty) == 0 ? 0 : (inputValues[i].nosOfRacks * hardware.qty) <= 24 ? 2 : 4) * hardware.qty
                          : hardware.itemType === 'Leaf to Spine SFPs 100G'
                          ? (inputValues[i].nosOfRacks * hardware.qty) * (inputValues[i].nosOfRacks <= 1 ? 0 : 2) * hardware.qty
                          : hardware.itemType === 'Leaf to Spine Trunk Cable'
                          ? (inputValues[i].nosOfRacks * 2) * (inputValues[i].nosOfRacks <= 1 ? 0 : 2) * hardware.qty
                          : hardware.itemType === 'mTA'
                          ? (inputValues[i].totalmTAServers)
                          : hardware.itemType === 'Storage'
                          ? (inputValues[i].storageServers)
                          : hardware[`dataCenter${i + 1}`] || ''
                      }
                      className="short-text-field"
                      onChange={(e) => handleChange(index, e)}
                      readOnly={hardware.category === 'Utility Server'}
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
