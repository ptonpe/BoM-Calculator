const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));


app.post('/calculate', (req, res) => {
  try {
    const dataCenters = req.body;


    if (!Array.isArray(dataCenters)) {
      return res.status(400).json({ error: 'Invalid input, expected an array' });
    }


    const calculatedValues = dataCenters.map((center) => {
      const {
        technology,
        platformType,
        automationCluster,
        nosOfNodes,
        vCU,
        vDU,
        RUs,
        vDU2,
        vCUCPUP,
        PTP,
        XA,
      } = center;


      // Define the formula or logic for calculating the other parameters
      const nosOfUtilityServers = nosOfNodes === 0 ? 0 : 1;
      
      let nosOfAutomationClusterServers = 0;
      if (automationCluster == 1) {
        if (nosOfNodes == 0)
            nosOfAutomationClusterServers = 0;
        else if (nosOfNodes < 100) {
          nosOfAutomationClusterServers = 1;
        } else if (nosOfNodes >= 100) {
          nosOfAutomationClusterServers = 3;
        }
      }
      
      const nosOfCuClusterServers = Math.ceil(nosOfNodes / 50); // Example logic
      const totalCNFs = parseInt(vCU) + parseInt(vDU) + parseInt(RUs);
      const totalNFs = parseInt(vDU2) + parseInt(vCUCPUP) + parseInt(PTP);


      // Calculating MTCIL based on totalNFs
      let MTCIL = 0;
      if (totalNFs < 60) {
        MTCIL = 16;
      } else if (totalNFs >= 60 && totalNFs < 120) {
        MTCIL = 32;
      } else if (totalNFs >= 120 && totalNFs < 180) {
        MTCIL = 48;
      } else if (totalNFs >= 180) {
        MTCIL = 64;
      }


      // Calculate nCMS based on totalCNFs
      let nCMS = 0;
      if (totalCNFs <= 350) {
        nCMS = 23;
      } else if (totalCNFs > 350 && totalCNFs <= 775) {
        nCMS = 32;
      } else if (totalCNFs > 775 && totalCNFs <= 4800) {
        nCMS = 43;
      } else if (totalCNFs >= 1500) {
        nCMS = 61;
      }

      const CRDL = 32;
      const components = 36;
      const sdaas = 5;
      const ODF = 12;
      const OSD = 12;
      
      const totalNosOfPCORE = nCMS + CRDL + components + sdaas + MTCIL + ODF + OSD + parseInt(XA);
      const nosOfRanMgmtClusterServers = Math.ceil(totalNosOfPCORE / 56);

      const totalNosOfServers = nosOfUtilityServers + nosOfAutomationClusterServers + nosOfRanMgmtClusterServers + nosOfCuClusterServers;
      let nosOfRacks = 0;
      if (nosOfNodes == 0) {
        nosOfRacks = 0;
      } else if (totalNosOfServers <= 15) {
        nosOfRacks = 1;
      } else if (totalNosOfServers <= 30) {
        nosOfRacks = 2;
      } else if (totalNosOfServers <= 45) {
        nosOfRacks = 3;
      } else {
        nosOfRacks = 4;
      }

      return {
        ...center,
        nosOfUtilityServers,
        nosOfAutomationClusterServers,
        nosOfRanMgmtClusterServers,
        nosOfCuClusterServers,
        totalNosOfServers,
        nosOfRacks,
        totalCNFs,
        totalNFs,
        nCMS,
        MTCIL,
        XA,
        totalNosOfPCORE
      };
    });


    res.json(calculatedValues);
  } catch (error) {
    console.error('Error calculating values:', error);
    res.status(500).send('Server error');
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));