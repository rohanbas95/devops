import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

// Initialize DynamoDB DocumentClient
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'ap-south-1' // Replace with your AWS region
});

const TABLE_NAME = 'productdb'; // Replace with your DynamoDB table name

// REST API
app.get('/api/products', async (req, res) => {
  const params = {
    TableName: TABLE_NAME
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  const product = { ...req.body, id: uuidv4() };

  const params = {
    TableName: TABLE_NAME,
    Item: product
  };

  try {
    await dynamoDb.put(params).promise();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const updateParams = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #name = :name',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: { ':name': req.body.name },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const data = await dynamoDb.update(updateParams).promise();
    res.json(data.Attributes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const deleteParams = {
    TableName: TABLE_NAME,
    Key: { id }
  };

  try {
    await dynamoDb.delete(deleteParams).promise();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Example: Get user info for a product
app.get('/api/products/:id/user', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/api/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(port, () => {
  console.log(`Product service listening at http://localhost:${port}`);
});