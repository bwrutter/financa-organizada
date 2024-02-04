import { APIGatewayProxyEvent } from "aws-lambda";
import {
  validatePostAccounts,
  validateGetAccounts,
  validateDeleteAccounts,
} from "./validate";

export async function getAccounts(event: APIGatewayProxyEvent) {
  const params = event.queryStringParameters;
  const response = await validateGetAccounts(params);
  return response;
}

export async function postAccounts(event: APIGatewayProxyEvent) {
  const body = JSON.parse(event.body);
  const response = await validatePostAccounts(body);
  return response;
}

export async function deleteAccounts(event: APIGatewayProxyEvent) {
  const params = event.queryStringParameters;
  const response = await validateDeleteAccounts(params);
  return response;
}
