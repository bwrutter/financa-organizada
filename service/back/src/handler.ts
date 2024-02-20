import { APIGatewayProxyEvent } from "aws-lambda";
import {
  validatepostAccount,
  validategetAccount,
  validatedeleteAccount,
  validateUpdateAccount,
} from "./validate";

export async function getAccount(event: APIGatewayProxyEvent) {
  const params = event.queryStringParameters;
  const response = await validategetAccount(params);
  return response;
}

export async function postAccount(event: APIGatewayProxyEvent) {
  const body = JSON.parse(event.body);
  const response = await validatepostAccount(body);
  return response;
}

export async function deleteAccount(event: APIGatewayProxyEvent) {
  const params = event.queryStringParameters;
  const response = await validatedeleteAccount(params);
  return response;
}

export async function putAccount(event: APIGatewayProxyEvent) {
  const params = JSON.parse(event.body);
  const response = await validateUpdateAccount(params);
  return response;
}
