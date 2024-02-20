import { APIGatewayProxyEvent } from "aws-lambda";
import {
  validatePostAccount,
  validateGetAccount,
  validateDeleteAccount,
  validateUpdateAccount,
  validateGetAllAccounts,
} from "./validate";

export async function getAccount(event: APIGatewayProxyEvent) {
  const params = event.queryStringParameters;
  const response = await validateGetAccount(params);
  return response;
}

export async function getAllAccounts() {
  const response = await validateGetAllAccounts();
  return response;
}

export async function postAccount(event: APIGatewayProxyEvent) {
  const body = JSON.parse(event.body);
  const response = await validatePostAccount(body);
  return response;
}

export async function deleteAccount(event: APIGatewayProxyEvent) {
  const params = event.queryStringParameters;
  const response = await validateDeleteAccount(params);
  return response;
}

export async function putAccount(event: APIGatewayProxyEvent) {
  const params = JSON.parse(event.body);
  const response = await validateUpdateAccount(params);
  return response;
}
