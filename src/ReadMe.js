import React from 'react';
import { Link } from 'react-router-dom';
import './ReadMe.css';

const ReadMe = () => {
  return (
    <div className="readme-container">
      <h1>Welcome to the Hardware Dimensioning Tool</h1>
      <p>This tool helps you dimension your hardware based on various parameters and configurations. Below are the steps to use the tool:</p>
      
      <h2>Step 1: Set Up Data Centers</h2>
      <p>
        On the initial page, you will be prompted to enter the number of data centers you want to configure. This will determine how many data center columns will be generated in the subsequent tables.
      </p>
      
      <h2>Step 2: Configure Parameters</h2>
      <p>
        After setting the number of data centers, you will be presented with tables to input various parameters for each data center. These parameters include:
      </p>
      <ul>
        <li>Technology</li>
        <li>Platform Type</li>
        <li>Automation Cluster</li>
        <li>Number of Nodes</li>
        <li>Site Name</li>
        <li>Total Servers</li>
        <li>And many more...</li>
      </ul>
      <p>
        Some fields, like <strong>Technology</strong> and <strong>Platform Type</strong>, are dropdowns with predefined options. Other fields are text inputs where you can enter numerical values.
      </p>
      
      <h2>Step 3: RAN Management vBOM</h2>
      <p>
        This section allows you to configure parameters related to the RAN Management. You will input values for fields such as:
      </p>
      <ul>
        <li>vCU</li>
        <li>vDU</li>
        <li>RUs</li>
        <li>And more...</li>
      </ul>
      
      <h2>Step 4: XA Dimensioning</h2>
      <p>
        Here, you configure parameters related to XA, including XA (PC) and XA (Storage).
      </p>
      
      <h2>Step 5: MTCIL Dimensioning</h2>
      <p>
        In this section, you configure the DU, vDU2, vCUCPUP, PTP, and other related fields. The values you input here will affect the calculation of MTCIL and other related parameters.
      </p>
      
      <h2>Step 6: CU vBOM</h2>
      <p>
        This section focuses on the CU configuration, including fields such as:
      </p>
      <ul>
        <li>Number of Sites</li>
        <li>Cells Per Sector (4G, 5GFDD, 5GTDD)</li>
        <li>Midhaul (4G, 5GFDD, 5GTDD)</li>
        <li>Pooling (4G, 5GFDD, 5GTDD)</li>
        <li>Total Servers (4G, 5GFDD, 5GTDD)</li>
        <li>And more...</li>
      </ul>
      
      <h2>Step 7: Export to Excel</h2>
      <p>
        Once you have configured all the parameters, you can export the data to an Excel file by clicking the <strong>Export to Excel</strong> button. This will generate an Excel file with all the input values and calculated results.
      </p>
      
      <h2>Navigation</h2>
      <p>
        You can navigate between the main configuration page and the hardware data page using the provided links. Click the button below to start configuring your data centers.
      </p>
      <Link to="/main">
        <button>Go to Tool</button>
      </Link>
    </div>
  );
};

export default ReadMe;
