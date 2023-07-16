# DT-Money API Documentation

## Introduction
Welcome to the documentation of the DT-Money API! This API is designed to help you manage your personal finances by allowing you to create, list, and delete transactions. It provides various endpoints to interact with the financial data. This documentation will guide you through the available endpoints, request/response formats, and technologies used.

## Endpoints
The DT-Money API offers the following endpoints:

### Create Transaction
- **Endpoint:** `POST /transactions`
- **Description:** Create a new transaction.
- **Request Body:**
```json
{
  "title": "Salary",
  "amount": 5000,
  "description": "income",
  "type": "credit"
}
```
- **Response:**
```json
{
  "message": "Transaction created"
}
```

### Get Transactions
- **Endpoint:** `GET /transactions`
- **Description:** Retrieve all transactions.
- **Response:**
```json
{
  "transactions": [
    {
      "id": "1",
      "title": "Salary",
      "amount": 5000,
      "description": "income",
      "type": "credit",
      "created_at": "2021-06-27T22:26:05.000Z"
    },
    {
      "id": "2",
      "title": "Rent",
      "amount": 1000,
      "description": "outcome",
      "type": "debit",
      "created_at": "2021-06-27T22:26:05.000Z"
    }
  ]
}
```

### Get Transaction by ID
- **Endpoint:** `GET /transactions/:id`
- **Description:** Retrieve a specific transaction by ID.
- **Response:**
```json
{
  "transaction": {
    "id": "1",
    "title": "Salary",
    "amount": 5000,
    "description": "income",
    "type": "credit",
    "created_at": "2021-06-27T22:26:05.000Z"
  }
}
```
**OR**
`undefined`

### Search Transactions
- **Endpoint:** `GET /transactions/query?search=string`
- **Description:** Search transactions by title or description.

### Get Transaction Summary
- **Endpoint:** `GET /transactions/summary`
- **Description:** Retrieve a summary of all transactions.
- **Response:**
```json
{
  "summary": {
    "amount": 4000
  },
  "outcome": {
    "amount": 1000
  },
  "income": {
    "amount": 5000
  }
}
```

### Delete Transaction
- **Endpoint:** `DELETE /transactions/:id`
- **Description:** Delete a transaction by ID.
- **Response:**
```json
{
  "message": "Transaction deleted"
}
```

## Technologies Used
The DT-Money API is built using the following technologies:
- Node.js
- Fastify
- TypeScript
- Knex
- SQLite3 and PostgreSQL
- Vitest

Feel free to explore these endpoints and leverage the power of the DT-Money API for efficient personal finance management!