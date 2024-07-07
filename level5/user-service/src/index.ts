import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import serverless from 'serverless-http';
import axios from 'axios';

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Initialize DynamoDB DocumentClient
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'ap-south-1' // Replace with your AWS region
});

const TABLE_NAME = 'userdb-rohan'; // Replace with your DynamoDB table name

// REST API
app.get('/api/users', async (req, res) => {
  const params = {
    TableName: TABLE_NAME
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  const user = { ...req.body, id: uuidv4() };

  const params = {
    TableName: TABLE_NAME,
    Item: user
  };

  try {
    await dynamoDb.put(params).promise();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
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
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const deleteParams = {
    TableName: TABLE_NAME,
    Key: { id }
  };

  try {
    await dynamoDb.delete(deleteParams).promise();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Example: Get all products for a user
app.get('/api/users/:id/products', async (req, res) => {
  try {
    const response = await axios.get('https://n3ocaa5sxg.execute-api.ap-south-1.amazonaws.com/prod/api/products');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export const handler = serverless(app);