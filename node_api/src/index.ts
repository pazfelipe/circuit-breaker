import express from 'express';
import axios from 'axios';
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

app.get('/python-data', async (req, res) => {
  try {
    const response = await axios.get('http://python_api:5001/data');
    res.json({ python_data: response.data });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  // Simulate the restart delay
  const restartInterval = parseInt(process.env.RESTART_INTERVAL || '10', 10);
  setTimeout(() => {
    console.log(`Node.js API is listening on port ${port}`);
  }, restartInterval * 1000);
});