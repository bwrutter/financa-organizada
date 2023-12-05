import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
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

const tableName = "financa-organizada-api-local";

export async function createAccount(contas: ContaPost) {
  const accountId = uuidv4(); //TODO: Incluir alguma checagem para verificar se a conta ja existe, pelo nome, valor e tipo coincidirem
  const { nome, valor, tipo } = contas;
  const userId = "123"; //TODO: Vir por parametro automaticamente no futuro
  const params = {
    TableName: tableName,
    Item: {
      accountId: { S: accountId },
      userId: { S: userId },
      nome: { S: nome },
      tipo: { S: tipo },
      valor: { N: valor.toString() },
    },
  };

  try {
    const response = await dynamoDBClient.send(new PutItemCommand(params));
    return JSON.stringify(response);
  } catch (error) {
    console.error("Erro ao criar item:", error);
    throw error;
  }
}

export async function getAccounts(param: string) {
  const params = {
    TableName: tableName,
    Key: {
      userId: { S: param },
    },
  };

  try {
    const response = await dynamoDBClient.send(new GetItemCommand(params));
    if (response.Item) {
      return JSON.stringify(response.Item);
    } else {
      return { message: "Item não encontrado" };
    }
  } catch (error) {
    console.error("Erro ao buscar item:", error);
    throw error;
  }
}

export async function deleteAccount(param: string) {
  const params = {
    TableName: tableName,
    Key: {
      userId: { S: param },
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

type ContaPost = {
  nome: string;
  valor: number;
  tipo: string;
};
