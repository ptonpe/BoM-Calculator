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
      } = center;

      // Define the formula or logic for calculating the other parameters
      const nosOfUtilityServers = automationCluster == 0 ? 0 : 1;
      
      let nosOfAutomationClusterServers = 0;
      if (automationCluster == 1) {
        if (nosOfNodes < 99) {
            nosOfAutomationClusterServers = 1;
        } else if (nosOfNodes > 99 & nosOfNodes < 3500) {
            nosOfAutomationClusterServers = 3;
        }
      }
      
      const nosOfRanMgmtClusterServers = Math.ceil(nosOfNodes / 20); // Example logic
      const nosOfCuClusterServers = Math.ceil(nosOfNodes / 50); // Example logic
      const totalNosOfServers = nosOfUtilityServers + nosOfAutomationClusterServers + nosOfRanMgmtClusterServers + nosOfCuClusterServers;
      const nosOfRacks = Math.ceil(totalNosOfServers / 13); 

      return {
        ...center,
        nosOfUtilityServers,
        nosOfAutomationClusterServers,
        nosOfRanMgmtClusterServers,
        nosOfCuClusterServers,
        totalNosOfServers,
        nosOfRacks,
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
