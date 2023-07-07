# DT-Money API
Essa API é para o controle de finanças pessoais, onde é possível cadastrar, listar e excluir transações.

## Endpoints
### Post `/transactions`
Request:
```json
{
  "title": "Salário", //String
  "amount": 5000,     //Number
  "description": "income", //String
  "type": "credit" //Enum ['credit', 'debit']
}
```
Return:
```json
{
    "message": "Transaction created"
}
```
`status: 201` 

### Get `/transactions`
* This endpoint returns all transactions registered in the database in the following format:
Return:
```json
{
    "transactions": [
        {
            "id": "1",
            "title": "Salário",
            "amount": 5000,
            "description": "income",
            "type": "credit",
            "created_at": "2021-06-27T22:26:05.000Z"
        },
        {
            "id": "2",
            "title": "Aluguel",
            "amount": 1000,
            "description": "outcome",
            "type": "debit",
            "created_at": "2021-06-27T22:26:05.000Z"
        }
    ]
}
```

### Get `/transactions/:id`
* This endpoint returns a transaction registered in the database in the following format:
Return:
```json
{
    "transaction": {
        "id": "1",
        "title": "Salário",
        "amount": 5000,
        "description": "income",
        "type": "credit",
        "created_at": "2021-06-27T22:26:05.000Z"
    }
}
```
**OR**
`undefined`

### Get `/transactions/summary`
* This endpoint returns the summary of all transactions registered in the database in the following format:
Return:
```json
{
    "summary": {
        "amount": 4000,
    }
}
```