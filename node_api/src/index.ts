import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import CircuitBreaker from 'opossum';

dotenv.config();

const app = express();
const port = 3000;

const options = {
  timeout: 3000, // If the action takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, open the circuit
  resetTimeout: 10000 // After 10 seconds, try again.
};

const breaker = new CircuitBreaker(async () => {
  const response = await axios.get('http://python_api:5001/data');
  return response.data;
}, options);

app.get('/status', (req, res) => {
  res.json({ status: "Node.js API is running" });
});

app.get('/data', (req, res) => {
  res.json({ data: "Here is some data from the Node.js API" });
});

app.get('/python-data', async (req, res) => {
  try {
    const data = await breaker.fire();
    res.json({ python_data: data });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    const restartInterval = parseInt(process.env.RESTART_INTERVAL || '10', 10);
    setTimeout(() => {
      console.log(`Node.js API is listening on port ${port}`);
    }, restartInterval * 1000);
  });
}

export default app;