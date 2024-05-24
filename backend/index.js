// backend/index.js
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
        nosOfUtilityServers,
        nosOfAutomationClusterServers,
        nosOfRanMgmtClusterServers,
        nosOfCuClusterServers,
      } = center;

      const totalNosOfServers =
        parseInt(nosOfUtilityServers) +
        parseInt(nosOfAutomationClusterServers) +
        parseInt(nosOfRanMgmtClusterServers) +
        parseInt(nosOfCuClusterServers);

      return { ...center, totalNosOfServers };
    });

    res.json(calculatedValues);
  } catch (error) {
    console.error('Error calculating values:', error);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));