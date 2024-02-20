import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const dynamoDBClient = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "localstackAccessKeyId",
    secretAccessKey: "localstackSecretAccessKey",
  },
  endpoint: "http://financa-organizada-localstack:4566",
});

const tableName = "AccountsTable";

//TODO: Futuramente, quando tiver varios usuarios, adicionar o id do usuario na tabela.
//TODO: Ajsutar os returns
export async function createAccount(contas: ContaPost) {
  console.log(contas);
  const _id = uuidv4();
  const { name, value } = contas;
  const params = {
    TableName: tableName,
    Item: {
      _id: { S: _id },
      _name: { S: name },
      value: { N: value.toString() },
    },
  };

  try {
    const response = await dynamoDBClient.send(new PutItemCommand(params));
    return JSON.parse(JSON.stringify(params));
  } catch (error) {
    console.error("Erro ao criar item:", error);
    throw error;
  }
}

export async function getAccount(param: ContaPost) {
  const params = {
    TableName: tableName,
    Key: {
      _id: { S: param.id },
    },
  };

  try {
    const response = await dynamoDBClient.send(new GetItemCommand(params));
    if (response.Item) {
      return JSON.parse(JSON.stringify(response.Item));
    } else {
      return { message: "Item não encontrado" };
    }
  } catch (error) {
    console.error("Erro ao buscar item:", error);
    throw error;
  }
}

export async function getAllAccounts() {
  const params = {
    TableName: tableName,
  };

  try {
    const response = await dynamoDBClient.send(new ScanCommand(params));
    return JSON.parse(JSON.stringify(response.Items));
  } catch (error) {
    console.error("Erro ao buscar todos os itens:", error.message || error);
    throw error;
  }
}

export async function deleteAccount(param: ContaPost) {
  const params = {
    TableName: tableName,
    Key: {
      _id: { S: param.id },
    },
  };

  try {
    const response = await dynamoDBClient.send(new DeleteItemCommand(params));
    return JSON.stringify(response);
  } catch (error) {
    console.error("Erro ao deletar item:", error);
    throw error;
  }
}

export async function updateAccount(param: ContaPost) {
  const { id, name, value } = param;

  const updateExpression = "SET #name = :name, #value = :value";

  const expressionAttributeNames = {
    "#name": "_name",
    "#value": "value",
  };

  const expressionAttributeValues = {
    ":name": { S: name },
    ":value": { N: value.toString() },
  };

  const params = {
    TableName: tableName,
    Key: {
      _id: { S: id },
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  try {
    const response = await dynamoDBClient.send(new UpdateItemCommand(params));
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
    throw error;
  }
}

type ContaPost = {
  id: string;
  name: string;
  value: number;
};
