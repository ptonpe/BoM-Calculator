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
        XApc,
        XAstor,
        nosOfSites,
        pooling4G,
        pooling5GFDD,
        pooling5GTDD,
        absMidhaulPer4G,
        absMidhaulPer5GFDD,
        absMidhaulPerTDD,
        plannedFDDCard,
        plannedTDDCard,
        isCU,
        isCURedundant,
        redundancyPercentage,
        cellsPerSector4G,
        cellsPerSectorFDD,
        cellsPerSectorTDD,
        storageServers,
        mTAServers
      } = center;


      // Define the formula or logic for calculating the other parameters
      const nosOfUtilityServers = nosOfNodes == 0 ? 0 : 1;
      const realvCUCPUP = parseInt(vCUCPUP);
      const adjustedVCUCPUP = isCU === 1 ? 0 : realvCUCPUP;
      
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
      
      const totalCNFs = parseInt(vCU) + parseInt(vDU) + parseInt(RUs);
      const totalNFs = parseInt(vDU2) + parseInt(adjustedVCUCPUP) + parseInt(PTP);
      const doubledvCU = parseInt(vCU) * 2;


      // Calculating MTCIL based on totalNFs
      let MTCIL = 0;
      if (doubledvCU < 60) {
        MTCIL = 16;
      } else if (doubledvCU >= 60 && doubledvCU < 120) {
        MTCIL = 32;
      } else if (doubledvCU >= 120 && doubledvCU < 180) {
        MTCIL = 48;
      } else if (doubledvCU >= 180 && doubledvCU < 240) {
        MTCIL = 64;
      } else if (doubledvCU >= 240 && doubledvCU < 300) {
        MTCIL = 80;
      } else if (doubledvCU >= 300 && doubledvCU < 360) {
        MTCIL = 96;
      } else if (doubledvCU >= 360 && doubledvCU < 420) {
        MTCIL = 112;
      } else if (doubledvCU >= 420 && doubledvCU < 480) {
        MTCIL = 128;
      } else if (doubledvCU >= 480) {
        MTCIL = 144;
      }


      // Calculate nCMS based on totalCNFs
      let nCMS = 0;
      if (totalCNFs <= 350) {
        nCMS = 23;
      } else if (totalCNFs > 350 && totalCNFs <= 775) {
        nCMS = 32;
      } else if (totalCNFs > 775 && totalCNFs <= 4800) {
        nCMS = 43;
      } else if (totalCNFs > 4800) {
        nCMS = 61;
      }

      const CRDL = 32;
      const components = 36;
      const sdaas = 5;
      const ODF = 12;
      const OSD = 12;
      
      const totalNosOfPCORE = nCMS + CRDL + components + sdaas + MTCIL + ODF + OSD + parseInt(XApc);
      const RANservers = Math.ceil(totalNosOfPCORE / 56);
      const diskCapacity = RANservers * 1.7;
      const deltaRequirement = XAstor - diskCapacity;
      const additionalServers = Math.ceil(deltaRequirement > 0 ? deltaRequirement / 1.7 : 0);
      const nosOfRanMgmtClusterServers = RANservers + additionalServers;

      const pooling4GDouble = (100 - pooling4G) / 100;
      const absMidhaulThrough4G = nosOfSites * (absMidhaulPer4G * (pooling4GDouble)) * cellsPerSector4G;

      const pooling5GFDDDouble = (100 - pooling5GFDD) / 100;
      const absMidhaulThrough5GFDD = nosOfSites * (absMidhaulPer5GFDD * (pooling5GFDDDouble)) * cellsPerSectorFDD;

      const pooling5GTDDDouble = (100 - pooling5GTDD) / 100;
      const absMidhaulThrough5GTDD = nosOfSites * (absMidhaulPerTDD * (pooling5GTDDDouble)) * cellsPerSectorTDD;

      const perInstance4G = Math.ceil(absMidhaulThrough4G / 6000);
      const perInstance5GFDD = Math.ceil(absMidhaulThrough5GFDD / 12000);
      const perInstance5GTDD = Math.ceil(absMidhaulThrough5GTDD / 12000);

      const perInstance4GCard = Math.ceil(perInstance4G / 1);
      const perInstance5GFDDCard = plannedFDDCard == 0 ? 0 : Math.ceil(perInstance5GFDD / plannedFDDCard);
      const perInstance5GTDDCard = plannedTDDCard == 0 ? 0 : Math.ceil(perInstance5GTDD / plannedTDDCard);

      const total4GServers = Math.ceil((perInstance4G + perInstance4GCard) / 10);
      const total5GFDDServers = Math.ceil((perInstance5GFDD + perInstance5GFDDCard) / 5);
      const total5GTDDServers = Math.ceil((perInstance5GTDD + perInstance5GTDDCard) / 5);

      const nosOfCPInstances = perInstance4GCard + perInstance5GFDDCard + perInstance5GTDDCard;
      const nosOfUPInstances = perInstance4G + perInstance5GFDD + perInstance5GTDD;
      const totalvCUInstances = nosOfCPInstances + nosOfUPInstances;

      const masterPCORE = isCU == 0 ? 0 : 36;
      let mtcilRequirement = 0;
      if (totalvCUInstances > 150)
        mtcilRequirement = 64;
      else if (totalvCUInstances > 100)
        mtcilRequirement = 48;
      else if (totalvCUInstances > 50)
        mtcilRequirement = 32;
      else 
        mtcilRequirement = 16;

      const mtcilPCORE = isCU == 0 ? 0 : mtcilRequirement;
      const totalClusterPCORE = masterPCORE + mtcilPCORE;
      const totalCUServers = Math.ceil(totalClusterPCORE / 56);

      const redundant = isCURedundant == 0 ? 0 : (redundancyPercentage / 100);
      const totalCURedundancy = Math.ceil(redundant * (total4GServers + total5GFDDServers + total5GTDDServers));

      const nosOfCuClusterServers = total4GServers + total5GFDDServers + total5GTDDServers + totalCUServers + totalCURedundancy;

      const totalNosOfServers = nosOfUtilityServers + nosOfAutomationClusterServers + nosOfRanMgmtClusterServers + nosOfCuClusterServers + mTAServers + parseInt(storageServers);
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
        XApc,
        totalNosOfPCORE,
        absMidhaulThrough4G,
        absMidhaulThrough5GFDD,
        absMidhaulThrough5GTDD,
        perInstance4G,
        perInstance5GFDD,
        perInstance5GTDD,
        perInstance4GCard,
        perInstance5GFDDCard,
        perInstance5GTDDCard,
        total4GServers,
        total5GFDDServers,
        total5GTDDServers,
        masterPCORE,
        mtcilPCORE,
        totalvCUInstances,
        totalClusterPCORE,
        totalCUServers,
        totalCURedundancy,
        additionalServers,
        mTAServers,
        storageServers
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