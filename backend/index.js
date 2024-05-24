// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from React frontend

app.post('/calculate', (req, res) => {
  const dataCenters = req.body;

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
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));