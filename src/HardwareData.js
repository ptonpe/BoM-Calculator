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
      itemType: 'Dell R750/R740',
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

  const [itemDescriptions, setItemDescriptions] = useState({
    // Define descriptions for each item type
    'Dell R650': ["Dell 15G Master Control Node R650, DC", "Dell 15G Master Control Node R650, AC"],

    'Dell R750/R740': [
      "Dell 15G Standard Worker R750XL, 2x6330N (28c), 512GB RAM, 4x Intel E810 Dual Port, SSD 2x480GB 4x1.6TB SAS MU, PSU 1100W (DC)",
        "Dell 15G Standard Worker R750XL, 2x6330N (28c), 512GB RAM, 4x Intel E810 Dual Port, SSD 2x480GB 4x1.6TB SAS MU, PSU 1400W (AC)",
        "Dell PowerEdge R740 XL 2x 26c 512GB vCompute/Worker /vDU/5GC/CU/HCI  Node -2x600GB SAS HDD4x1.6TB SSD(7.6TB)  storage  DC",
        "Dell PowerEdge R740 XL 2x 26c 512GB vCompute/Worker /vDU/5GC/CU/HCI  Node -2x600GB SAS HDD4x1.6TB SSD(7.6TB)  storage  AC" ],
    
      
    'Rack': ["HPE NFV/NON -NFV  42U Rack with 1P G2 Basic PDU  - International",
  "HPE OPEN STACK HP RACK &  US/JP AC POWER", "OPEN STACK HP RACK DC POWER"],

    'TOR Switch': ["STAND-ALONE NON STDN - TOR ARISTA 7050X3,  32X100GBE QSFP+ & 2XSFP+ SWITCH,  REAR TO FRONT AIR,  2XAC",
        "STAND-ALONE NON STDN - ToR ARISTA 7050X3,  32x100GbE QSFP+ & 2xSFP+ SWITCH,  REAR TO FRONT AIR,  2xDC",
        "S5232-F-ON AC ToR - Leaf Switch (2 per rack) 32x100G, 32xQSFP28, 2x10GbE SFP+, 2xAC PSU",
        "S5232-F-ON DC ToR - Leaf Switch (2 per rack) 32x100G, 32xQSFP28, 2x10GbE SFP+, 2xDC PSU",
        "LEAF/SPINE/ToR ARISTA 7050X3,  32 x 100GbE QSFP+ & 2xSFP+ SWITCH,  REAR TO FRONT AIR,  2xAC 2xC13-C14",
        "LEAF/SPINE/ToR Arista 7050X3,  32x100GbE QSFP+ & 2xSFP+ SWITCH,  REAR TO FRONT AIR,  2xDC"],

    'Management Switch': ["MANAGEMENT SWITCH - ARISTA 7010T,  48x RJ45 (100/1000),  4 x SFP+ (1/10GbE) SWITCH,  REAR TO FRONT AIR",
  "MANAGEMENT SWITCH - ARISTA 7010T,  48x RJ45 (100/1000),  4 x SFP+ (1/10GbE) SWITCH,  REAR TO FRONT AIR",
  "CISCO NEXUS 92348GC-X – AC MANAGED 48 x 10/100/1000 + 4 x 1/10/25 GIGABIT",
  "Cisco Nexus mgmt switch 92348GC-X   DC 48 x 10/100/1000 + 4 x 1/10/25 Gigabit SFP28 + 2 x 40/100 Gig"],

    'Spine Switch': ["S5232-F-ON AC ToR - Spine Switch 32x100G, 32xQSFP28, 2x10GbE SFP+, 2xAC PSU",
  "S5232-F-ON DC ToR - Spine Switch 32x100G, 32xQSFP28, 2x10GbE SFP+, 2xDC PSU"],

    'SDN(CCF/BCF) Server': ["Arista CCF Controller (aka BCF) – Dell 15G R450"],

    'Leaf to servers Breakout Cable 100G': ["3M - 100G Multimode breakout  (OM4) 50/125 - 12 Strand Plenum MPO Armored Harness with MPO(Female)-LC connectors. OM4 (Aqua) Plenum MPO Armored Harness for 40G/100G fiber optic networks.",
  "5M  (15FT)- 100G Multimode breakout  (OM4) 50/125  12 Strand Plenum MPO Armored Harness with MPO(Female)-LC connectors. OM4 (Aqua) Plenum MPO Armored Harness for 40G/100G fiber optic networks."],

    'Leaf to Servers 100G SFP\'s': ["QSFP28,100m,100GBASE-SR4,4x 850nm VCSEL, MMF,"],
    'Leaf to CCF/SDN Breakout Cable 40G': ["Cable: 40G multimode Fanout Cables MPO-3 meter Plenum Fiber Optic Cable, 40Gb MTP(MPO)/4LC Breakout, OM3"],
    'Leaf to CCF/SDN 40G SFPs': ["QSFP: Finisar FTL410QE2C 40GBase-SR4 QSFP+ Transceiver"],
    'Leaf to Leaf SFPs 100G': ["QSFP28,100m,100GBASE-SR4,4x 850nm VCSEL, MMF,"],

    'Leaf to Leaf Trunk Cable': ["Cable: 2meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#69010",
      "Cable: 1meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#68019",
      "Cable: 10M (33ft)MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#68025",
      "3 Meter Plenum 100G MTP Elite Armored Trunk Cable, 12 Core, Multimode, , MTP Elite Type B OM4",
      "1M -12 Fiber Plenum 100G MTP® Trunk Cable w/FiberShield Multimode 50/122-1 Meter MTP-MTP Connectors Type B OM4",
      "2 Meter Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4",
      "10M  (33FT) Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4"],

    'Leaf to Management SFP 100G': ["QSFP28,100m,100GBASE-SR4,4x 850nm VCSEL, MMF,"],

    'Leaf to Management Trunk Cable': ["Cable: 2meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#69010",
    "Cable: 1meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#68019",
    "Cable: 10M (33ft)MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#68025",
    "3 Meter Plenum 100G MTP Elite Armored Trunk Cable, 12 Core, Multimode, , MTP Elite Type B OM4",
    "1M -12 Fiber Plenum 100G MTP® Trunk Cable w/FiberShield Multimode 50/122-1 Meter MTP-MTP Connectors Type B OM4",
    "2 Meter Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4",
    "10M  (33FT) Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4"],

    'Management to servers Ethernet cable': ["GGG-EEE-009 Generic CAT6 9 feet Ethernet cable RJ45"],
    'Management to CCF/SDN Ethernet cable': ["GGG-EEE-009 Generic CAT6 9 feet Ethernet cable RJ45"],
    'Leaf to Spine SFPs 100G': ["QSFP28,100m,100GBASE-SR4,4x 850nm VCSEL, MMF, "],
    
    'Leaf to Spine Trunk Cable': ["Cable: 2meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#69010",
    "Cable: 1meter MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#68019",
    "Cable: 10M (33ft)MTP Female to Female 12 Fibers OM3 50/125 Multimode Trunk Cable, Type B, Elite, Plenum (OFNP), Aqua#68025",
    "3 Meter Plenum 100G MTP Elite Armored Trunk Cable, 12 Core, Multimode, , MTP Elite Type B OM4",
    "1M -12 Fiber Plenum 100G MTP® Trunk Cable w/FiberShield Multimode 50/122-1 Meter MTP-MTP Connectors Type B OM4",
    "2 Meter Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4",
    "10M  (33FT) Plenum 100G MTP Elite Armored Trunk Cable,12 Core, Multimode, , MTP Elite Type B OM4"]
      });

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