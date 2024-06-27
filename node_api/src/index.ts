import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.get('/status', (req, res) => {
  res.json({ status: "Node.js API is running" });
});

app.get('/data', (req, res) => {
  res.json({ data: "Here is some data from the Node.js API" });
});

app.listen(port, () => {
  // Simulate the restart delay
  const restartInterval = parseInt(process.env.RESTART_INTERVAL || '10', 10);
  setTimeout(() => {
    console.log(`Node.js API is listening on port ${port}`);
  }, restartInterval * 1000);
});