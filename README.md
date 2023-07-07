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
